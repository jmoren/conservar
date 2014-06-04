class CreateItemDetails < ActiveRecord::Migration
  def change
    create_table :item_details do |t|
      t.string :name
      t.string :value
      t.string :detail_type
      t.integer :item_id

      t.timestamps
    end
  end
end
