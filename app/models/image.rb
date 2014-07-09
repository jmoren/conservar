class Image < ActiveRecord::Base
  belongs_to :organization
  belongs_to :item
  belongs_to :treatment
  belongs_to :intervention
  mount_uploader :photo, PhotoUploader

end
