class CreateReports < ActiveRecord::Migration
  def change
    create_table :reports do |t|
      t.integer :collection_id
      t.string  :pdf
      t.integer :total_downloads
      t.timestamps
    end
  end
end
