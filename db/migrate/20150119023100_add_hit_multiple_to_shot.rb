class AddHitMultipleToShot < ActiveRecord::Migration
  def change
	  add_column :shots, :hit_number, :integer
	  add_column :shots, :hit_section, :string
  end
end
