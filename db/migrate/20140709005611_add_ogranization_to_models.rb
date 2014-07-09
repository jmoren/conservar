class AddOgranizationToModels < ActiveRecord::Migration
  def change
    add_column :collections, :organization_id, :integer
    add_column :items, :organization_id, :integer
    add_column :treatments, :organization_id, :integer
    add_column :reports, :organization_id, :integer
    add_column :images, :organization_id, :integer
    add_column :exams, :organization_id, :integer
  end
end
