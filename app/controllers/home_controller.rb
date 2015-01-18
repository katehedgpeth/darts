class HomeController < ApplicationController
  def index
	  @hit_pct = 32.41
	  @total_shots = 678
	  @best_shot = "Outer Single 17"
	  @worst_shot = "Triple 20"
  end
end
