class HomeController < ApplicationController
	def index
		name = params[:name]
		@user = User.includes(:shots, :practices, :turns).find(session[:current_user_id])
		puts "user = #{@user.name}"
		@name = @user.name
		@hit_pct = 32.41
		@total_shots = @user.shots.count
		@best_shot = "Outer Single 17"
		@worst_shot = "Triple 20"
	end
	
	def create
	end	
  
end
