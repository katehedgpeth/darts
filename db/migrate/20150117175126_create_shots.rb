class CreateShots < ActiveRecord::Migration
  def change
    create_table :shots do |t|
	    t.integer :game_id
	    t.integer :turn_id
	    t.integer :aiming_for
	    t.integer :hit
	    t.float :hit_x
	    t.float :hit_y

      t.timestamps null: false
    end
  end
end
