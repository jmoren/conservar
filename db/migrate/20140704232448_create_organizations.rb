class CreateOrganizations < ActiveRecord::Migration
  def change
    create_table :organizations do |t|
      t.string :name
      t.string :address
      t.string :contact_email
      t.string :phone

      t.timestamps
    end
  end
end
