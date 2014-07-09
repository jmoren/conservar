class Organization < ActiveRecord::Base
  has_many :users
  has_many :collections
  has_many :items
  has_many :images
  has_many :exams
  has_many :treatments

  def contact_info
    "#{self.phone || 'no phone'} - #{self.contact_email || 'no email'}"
  end
end
