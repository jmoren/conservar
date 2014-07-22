class AddShowOptionToImages < ActiveRecord::Migration
  def change
    add_column :images, :show_report, :boolean, default: false
  end
end
