class PracticeController < ApplicationController
# http://www.gotealeaf.com/blog/the-detailed-guide-on-how-ajax-works-with-ruby-on-rails
# 	respond_to :html, :js
		@@thisPractice ||= Practice.create		
		@@practice_id ||= @@thisPractice.id
		@@thisTurn ||= Turn.create
		@@turn_id ||= @@thisTurn.id
		@@hits = 0
		@@misses = 0

		@@turn_data = {
			"total_hits" => 0,
			"total_misses" => 0,
			"turns" => []
		}

	def new
		newPractice.user_id = @@user.id
		newPractice.save
		redirect_to practice_index_path
	end	

	def index
		
		@@session_turns = Turn.where("practice_id = ?", @@practice_id)
		@@session_turns.each do |thisTurn|
			puts "thisTurn = #{thisTurns}"
			@@turn_data["turns"] << { 
				"id" => thisTurn.id,
				"hits" => thisTurn.hits,
				"misses" => thisTurn.misses
			}
		end
		puts "practice_id = #{@@practice_id}"
		puts "turn_data = #{@@turn_data}"
		@@user = User.includes(:shots, :practices, :turns).find(session[:current_user_id])
		respond_to do |format|
			format.html
			format.json { render :json => @@turn_data }
		end		



		
	end


	def save_shot
	end

	def create
		shot = 	Shot.new
		shot.user_id = @@user.id
		shot.practice_id = @@practice_id
		shot.turn_id = @@turn_id
		shot.aiming_for = params[:aiming_for]
		shot.hit = params[:hit].to_i
		shot.hit_number = params[:hit_number].to_i
		shot.hit_section = params[:hit_section]
		shot.hit_x = params[:hit_x].to_i
		shot.hit_y = params[:hit_y].to_i
 		shot.save

		
		turn = Turn.find(@@turn_id)
		if params[:hit] == "1"
			puts "this should be recorded as a hit"
			puts @@turn_data["total_hits"]
			@@turn_data["total_hits"] += 1
			@@turn_data["turns"].each do |t|
				if t["id"] == @@turn_id
					t["hits"] +=1
				end
			end
			turn.hits += 1
			turn.save
		else
			puts "this should be recorded as a miss"
			@@turn_data["total_misses"] += 1
			@@turn_data["turns"].each do |t|
				if t["id"] == @@turn_id
					t["misses"] +=1
				end
			end
			turn.misses += 1
			turn.save
		end


		# @@turn_data[@@turn_id] = {
			# "hits" => Turn.find(@@turn_id).hits,
			# "misses" => Turn.find(@@turn_id).misses
		# }

		if params[:new_turn] == "true"
 			newTurn = Turn.create
 			@@turn_id = newTurn.id
 			@@turn_data["turns"] << {
 				"id" => @@turn_id,
 				"hits" => 0, 
 				"misses" => 0
 			}
		end	

 		
		# respond_with		
		respond_to do |format|
			format.json { render :json => @@turn_data }
		end		
		
	end
end
