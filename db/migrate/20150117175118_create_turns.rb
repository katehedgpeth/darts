class CreateTurns < ActiveRecord::Migration
  def change
    create_table :turns do |t|
	    t.integer :practice_id
	    t.integer :user_id
	    t.integer :aiming_for

      t.timestamps null: false
    end
  end
end