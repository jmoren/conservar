class Item < ActiveRecord::Base
  belongs_to :collection
  has_many :item_details, dependent: :destroy
  has_many :treatments, dependent: :destroy
  has_many :interventions, dependent: :destroy
  
  def treatment_open?
    treatments.where(closed_at: nil).size > 0
  end

  def current_treatment
    treatments.where(closed_at: nil).last.try(:id)
  end
end
