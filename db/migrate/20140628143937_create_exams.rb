class CreateExams < ActiveRecord::Migration
  def change
    create_table :exams do |t|
      t.integer :treatment_id
      t.integer :item_id
      t.string :name
      t.text :result
      t.text :observations

      t.timestamps
    end
  end
end
