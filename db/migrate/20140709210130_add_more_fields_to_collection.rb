class AddMoreFieldsToCollection < ActiveRecord::Migration
  def change
    add_column :collections, :entry_date, :date
    add_column :collections, :origin, :string
    add_column :collections, :owner, :string
  end
end
