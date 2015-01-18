class Turn < ActiveRecord::Base
	belongs_to :user
	belongs_to :practice
	has_many :shots 
end
