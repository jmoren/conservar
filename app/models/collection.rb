class Collection < ActiveRecord::Base
  belongs_to :organization
  has_many :items, dependent: :destroy
  has_many :reports, dependent: :nullify

  def has_data_to_write?
    no_items_empty = !items.empty?
    treatment_open = items.map{ |i| i.treatments.open.size }
    no_treatment_closed = !treatment_open.select{ |n| n != 0 }.empty?
    no_items_empty && no_treatment_closed
  end
end
