class PracticeController < ApplicationController
# http://www.gotealeaf.com/blog/the-detailed-guide-on-how-ajax-works-with-ruby-on-rails
# 	respond_to :html, :js

		newPractice ||= Practice.create		
		@@practice_id ||= newPractice.id


	def new
		newPractice.user_id = @@user.id
		newPractice.save
		redirect_to practice_index_path
	end	

	def index
		@@user = User.includes(:shots, :practices).find(session[:current_user_id])

		newTurn = Turn.create
		@@turn_id = newTurn.id
		newTurn.user_id = @@user.id
		newTurn.save
		
		@session_hits = @@user.shots.where("hit = ? AND practice_id = ?", 1, @@practice_id).count
		@session_misses = @@user.shots.where("hit = ? AND practice_id = ?", 0, @@practice_id).count
		if @session_hits > 0
			@session_accuracy = @session_hits / (@session_hits + @session_misses)
		else @session_accuracy = 0
		end

		@session_data = [{
			"session_hits" => @session_hits,
			"session_misses" => @session_misses,
			"session_accuracy" => @session_accuracy 
		}]
 		
		
		respond_to do |format|
			format.json { render :json => @session_data }
			format.html
		end		
		
	end


	def save_shot
	end

	def create
		puts "this is a post request"
		shot = 	Shot.new
		shot.user_id = @@user.id
		shot.practice_id = @@practice_id
		shot.turn_id = @@turn_id
		shot.aiming_for = params[:aiming_for]
		shot.hit = params[:hit]
		shot.hit_number = params[:hit_number]
		shot.hit_section = params[:hit_section]
		shot.hit_x = params[:hit_x]
		shot.hit_y = params[:hit_y]
 		shot.save
		if params[:new_turn] == "true"
 			newTurn = Turn.create
 			@@turn_id = newTurn.id
 			puts "turn_id = #{@@turn_id}"
 		else
 			puts "still the same turn, ##{@@turn_id}"
		end	
		
		puts "user_id = #{@@user.id}"
		
	end
end
