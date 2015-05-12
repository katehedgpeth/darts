class AddHitCountToTurns < ActiveRecord::Migration
  def up
  	change_table :turns do |t|
  		t.integer :hits, :default => 0, :null => false
  		t.integer :misses, :default => 0, :null => false
  	end
  end

  def down
  	remove_column :turns, :hits
  	remove_column :turns, :misses
  end
end
