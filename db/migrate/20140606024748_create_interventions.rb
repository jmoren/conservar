class CreateInterventions < ActiveRecord::Migration
  def change
    create_table :interventions do |t|
      t.integer :treatment_id
      t.integer :item_id
      t.text :description
      t.string :intervention_type

      t.timestamps
    end
  end
end
