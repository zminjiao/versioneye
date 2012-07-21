class Projectdependency

  include Mongoid::Document
  include Mongoid::Timestamps

  field :user_id, type: String
  field :project_id, type: String
  
  field :name, type: String
  field :group_id, type: String
  field :artifact_id, type: String
  field :version, type: String
  field :version_label, type: String
  field :current_version, type: String
  field :prod_key, type: String
  field :prod_type, type: String
  field :outdated, type: Boolean
  field :comperator, type: String, :default => "="
  field :scope, type: String, :default => "compile"
  
  def get_product
    if !self.prod_key.nil?
      product = Product.find_by_key(prod_key)
    end
    if product.nil?
      product = Product.new
      product.name = self.name
      product.group_id = self.group_id
      product.artifact_id = self.artifact_id
    end
    product
  end
  
  def is_outdated?
    return false if self.prod_key.nil?     
    product = get_product
    self.current_version = product.version
    self.save()

    if self.comperator.nil? 
      self.comperator = "="
    end
    
    if self.comperator.eql?("=") || self.comperator.eql?("==")
      if self.current_version.strip.eql?(version.strip) || product.wouldbenewest?(version.strip)
        return false
      end
    elsif self.comperator.eql?(">=")
      newest = Naturalsorter::Sorter.sort_version([version, product.version]).last
      if self.current_version.eql?(version) || product.wouldbenewest?(version) || newest.eql?(product.version)
        return false
      end
    elsif self.comperator.eql?(">")
      newest = Naturalsorter::Sorter.sort_version([version, product.version]).last
      if newest.eql?(product.version)
        return false
      end
    elsif self.comperator.eql?("~>") || self.comperator.eql?("~")
      if Naturalsorter::Sorter.is_version_current?(version, product.version)
        return false
      end
    end
    
    return true
  end
  
  def update_outdated
    if is_outdated? 
      self.outdated = true
    else 
      self.outdated = false
    end
  end

  def version_lbl
    if version_label
      version_label
    else
      version
    end
  end

  def comperator_lbl
    if version_label && version_label.match(/.x$/)
      "="
    else
      comperator
    end
  end
  
end