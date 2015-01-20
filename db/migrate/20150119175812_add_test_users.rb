class AddTestUsers < ActiveRecord::Migration
  def change
	  kate = User.new
	  kate.name = "Kate"
	  kate.username = "katehedgpeth@gmail.com"
	  kate.save
	  
	  brett = User.new
	  brett.name = "Brett"
	  brett.username = "brettleahy@gmail.com"
	  brett.save
  end
end
