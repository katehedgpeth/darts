class CreatePractices < ActiveRecord::Migration
  def change
    create_table :practices do |t|
	    t.integer :user_id
		t.integer :total_shot_count
		t.integer :total_hit_count
		t.integer :total_miss_count
      t.timestamps null: false
    end
  end
end
