class Treatment < ActiveRecord::Base
  belongs_to :item
  has_many :treatment_notes, dependent: :destroy

  def closed?
    !closed_at.nil? && closed_at >= Date.today
  end

  def open!
    self.update(closed_at: nil) if closed?
  end

  def close!
    self.update(closed_at: Time.now) unless closed?
  end
end
