class LoginController < ApplicationController
	
	def index
	end

	
	def create

#  commenting this first line out -- will set that up later
# 	    if user = User.authenticate(params[:username], params[:password])
			# Save the user ID in the session so it can be used in
			# subsequent requests
			session[:current_user_id] = params[:id]
			puts "session[:current_user_id] = #{session[:current_user_id]}"
			redirect_to home_index_path
# 	    end

	end
	
	def destroy
		reset_session
	end
end
