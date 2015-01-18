class User < ActiveRecord::Base
	has_many :practices
	has_many :turns
	has_many :shots
end
