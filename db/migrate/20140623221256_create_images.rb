class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.integer :item_id
      t.integer :treatment_id
      t.string  :photo
      t.text :description

      t.timestamps
    end
  end
end
