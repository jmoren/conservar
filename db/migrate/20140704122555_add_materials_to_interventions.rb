class AddMaterialsToInterventions < ActiveRecord::Migration
  def change
    add_column :interventions, :materials, :text
  end
end
