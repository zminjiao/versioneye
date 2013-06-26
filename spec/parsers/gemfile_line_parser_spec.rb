require 'spec_helper'

describe GemfileParser do

  before :each do
    @parser = GemfileParser.new
  end

  describe "fetch_line_elements" do

    it "returns the right elements" do
      line = "gem 'will_paginate'     , '<= 3.0.3'"
      elements = @parser.fetch_line_elements( line )
      elements.should_not be_nil
      elements.size.should eq(2)
      elements.first.should eql("gem 'will_paginate'     ")
      elements.last.should  eql(" '<= 3.0.3'")
    end

    it "returns the right elements without comments" do
      line = " gem 'will_paginate'     , '<= 3.0.3' # comment "
      elements = @parser.fetch_line_elements( line )
      elements.should_not be_nil
      elements.size.should eq(2)
      elements.first.should eql("gem 'will_paginate'     ")
      elements.last.should  eql(" '<= 3.0.3'")
    end

  end

  describe "fetch_gem_name" do

    it "returns nil because its not starting with gem " do
      line = "'will_paginate'     , '<= 3.0.3'"
      elements = @parser.fetch_line_elements( line )
      gem_name = @parser.fetch_gem_name elements
      gem_name.should be_nil
    end

    it "returns the right gen_name" do
      line = "gem 'will_paginate'     , '<= 3.0.3'"
      elements = @parser.fetch_line_elements( line )
      gem_name = @parser.fetch_gem_name elements
      gem_name.should_not be_nil
      gem_name.should eql("will_paginate")
    end

  end

  describe "replace comments" do

    it "replaces the comments" do
      line = "'will_paginate'     , '<= 3.0.3'  # test comment   "
      new_line = @parser.replace_comments line
      new_line.should_not be_nil
      new_line.should eql("'will_paginate'     , '<= 3.0.3'  ")
    end

  end

  describe "fetch_verison" do

    it "returns the right version" do
      line = "gem 'will_paginate'     , '<= 3.0.3'"
      elements = @parser.fetch_line_elements( line )
      @parser.fetch_version( elements ).should eql('<= 3.0.3')
    end

    it "returns the right version" do
      line = " gem 'will_paginate'     , \"> 3.0.3\""
      elements = @parser.fetch_line_elements( line )
      @parser.fetch_version( elements ).should eql('> 3.0.3')
    end

    it "returns the right version for GIT" do
      line = "gem \"copycopter_client\", :git     => \"git://github.com/nmk/copycopter-ruby-client.git\" "
      elements = @parser.fetch_line_elements( line )
      @parser.fetch_version( elements ).should eql(':git     => git://github.com/nmk/copycopter-ruby-client.git')
    end

    it "returns the right version for PATH" do
      line = "gem 'govkit'           , :path    => '/../vendor/gems'"
      elements = @parser.fetch_line_elements( line )
      @parser.fetch_version( elements ).should eql(":path    => /../vendor/gems")
    end

    it "returns the right version for Platforms" do
      line = "gem 'therubyracer'     , :platforms => :ruby"
      elements = @parser.fetch_line_elements( line )
      @parser.fetch_version( elements ).should eql("")
    end

  end

  describe "init_project" do

    it "inits the project" do
      project = @parser.init_project( "url_url" )
      project.should_not be_nil
      project.url.should eql("url_url")
      project.dependencies.should_not be_nil
      project.dependencies.size.should eq(0)
      project.project_type.should eql(Project::A_TYPE_RUBYGEMS)
      project.language.should     eql(Product::A_LANGUAGE_RUBY)
    end

  end

  describe "init_dependency" do

    it "inits the dependency with product" do
      product = ProductFactory.create_new
      gem_name = "rails"
      dependency = @parser.init_dependency( product, gem_name )
      dependency.should_not be_nil
      dependency.name.should eql( gem_name )
      dependency.prod_key.should eql(product.prod_key)
      dependency.version_current.should eql(product.version)
      product.remove
    end

    it "inits the dependency without product" do
      product = nil
      gem_name = "rails"
      dependency = @parser.init_dependency( product, gem_name )
      dependency.should_not be_nil
      dependency.name.should eql( gem_name )
      dependency.prod_key.should be_nil
      dependency.version_current.should be_nil
    end

  end

end
