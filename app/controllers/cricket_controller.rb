class CricketController < ApplicationController


	def index
		@user = User.find(session[:current_user_id])
		@name = @user.name
		@opponent = "Trainer 2"
	end
end
