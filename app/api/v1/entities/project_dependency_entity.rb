require 'grape'

module VersionEye
  module Entities
  
    class ProjectDependencyEntity < Grape::Entity
      expose :name
      expose :prod_key
      expose :group_id
      expose :artifact_id

      expose :version_current
      expose :version_requested

      expose :comperator, :as => :comparator
      expose :outdated
      expose :release, :as => :stable 
    end

  end
end

