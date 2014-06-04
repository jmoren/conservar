class Item < ActiveRecord::Base
  belongs_to :collection
  has_many :item_details, dependent: :destroy
end
