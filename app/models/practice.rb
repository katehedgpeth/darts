class Practice < ActiveRecord::Base
	has_many :turns
	has_many :shots
	belongs_to :user
end
