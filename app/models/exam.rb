class Exam < ActiveRecord::Base
  belongs_to :organization
  belongs_to :item
  belongs_to :treatment
end
