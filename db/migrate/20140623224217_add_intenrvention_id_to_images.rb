class AddIntenrventionIdToImages < ActiveRecord::Migration
  def change
    add_column :images, :intervention_id, :integer
  end
end
