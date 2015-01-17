class CreateTurns < ActiveRecord::Migration
  def change
    create_table :turns do |t|
	    t.integer :game_id
	    t.integer :aiming_for

      t.timestamps null: false
    end
  end
end
