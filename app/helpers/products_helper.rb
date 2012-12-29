module ProductsHelper
  
  def product_version_path(product)
    return "/package/0/version" if product.nil? 
    return "/package/#{product.to_param}/version/#{product.version_to_url_param}"
  end
  
  def product_url(product)
    return "/package/0/" if product.nil? 
    return "/package/#{product.to_param}"
  end
  
  def display_follow(product)
    return "none" if product.in_my_products
    return "block"
  end
  
  def display_unfollow(product)
    return "block" if product.in_my_products
    return "none"
  end

  def url_param_to_origin(param)
    if (param.nil? || param.empty?)
      return ""
    end
    key = String.new(param)
    key.gsub!("--","/")
    key.gsub!("~",".")
    key
  end

  def do_parse_search_input( query )
    query_empty = query.nil? || query.empty? || query.eql?("Be up-to-date")
    query = "json" if query_empty 
    query = query.strip()
    query = query.downcase
    return query
  end

  def get_lang_value( lang )
    lang = "," if lang.nil? || lang.empty?
    lang
  end

  def get_language_array(lang)

    languages = Array.new
    special_languages = {"php" => "PHP",
                          "node.js" =>  "Node.JS",
                          "nodejs" => "Node.JS"}

    langs = lang.split(",")
    langs.each do |language|
      if !language.strip.empty?
        language = language.downcase
        if special_languages.has_key? language
          languages.push(special_languages[language])
        else
          languages.push(language.capitalize)
        end
      end
    end
    languages
  end

  def attach_version(product, version_from_url)
    return nil if product.nil?
    version = url_param_to_origin( version_from_url )
    if version.nil? || version.empty?
      version = product.version
    end
    versionObj = product.get_version(version)
    if versionObj
      product.version = versionObj.version
      product.version_link = versionObj.link
      if versionObj.created_at
        today = DateTime.now.to_date
        diff = today - versionObj.created_at.to_date
        product.last_crawle_date = diff.to_i
        if versionObj.released_at
          diff_release = today - versionObj.released_at.to_date
          product.released_days_ago = diff_release.to_i
        end
      end
    end
  end

  def generate_json_for_circle_from_hash(circle)
    resp = ""
    circle.each do |key, dep| 
      resp += "{"
      resp += "\"connections\": [#{dep.connections_as_string}],"
      resp += "\"text\": \"#{dep.text}\","
      resp += "\"id\": \"#{dep.dep_prod_key}\"," 
      resp += "\"version\": \"#{dep.version}\"" 
      resp += "},"
    end
    end_point = resp.length - 2
    resp = resp[0..end_point]
    resp
  end

  def generate_json_for_circle_from_array(circle)
    resp = ""
    circle.each do |element| 
      resp += "{"
      resp += "\"connections\": [#{element.connections_string}],"
      resp += "\"text\": \"#{element.text}\","
      resp += "\"id\": \"#{element.dep_prod_key}\"," 
      resp += "\"version\": \"#{element.version}\"" 
      resp += "},"
    end
    end_point = resp.length - 2
    resp = resp[0..end_point]
    resp
  end

  def save_search_log(query, products, start)
    stop = Time.now
    wait = (stop - start) * 1000.0
    searchlog = Searchlog.new
    searchlog.search = query
    searchlog.wait = wait
    if products.nil? || products.total_entries == 0
      searchlog.results = 0  
    else
      searchlog.results = products.total_entries
    end
    searchlog.save
  end
  
end