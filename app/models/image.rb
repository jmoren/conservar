class Image < ActiveRecord::Base
  belongs_to :item
  belongs_to :treatment

  mount_uploader :photo, PhotoUploader

end
