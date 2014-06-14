class CreateTreatments < ActiveRecord::Migration
  def change
    create_table :treatments do |t|
      t.integer :item_id
      t.text :diagnosis
      t.text :proposal
      t.datetime :closed_at

      t.timestamps
    end
  end
end
