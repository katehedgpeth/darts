class Shot < ActiveRecord::Base
	belongs_to :user
	belongs_to :practice
	belongs_to :turn
end
