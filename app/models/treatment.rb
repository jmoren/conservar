class Treatment < ActiveRecord::Base
  belongs_to :organization
  belongs_to :item
  has_many :treatment_notes, dependent: :destroy
  has_many :images, dependent: :destroy
  has_many :interventions, dependent: :destroy
  has_many :exams, dependent: :destroy
  
  scope :open, -> {where(closed_at: nil)}
  
  def closed?
    !closed_at.nil?
  end

  def open!
    self.update(closed_at: nil)
  end

  def close!
    self.update(closed_at: Date.today)
  end
end
