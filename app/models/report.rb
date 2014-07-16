class Report < ActiveRecord::Base
  belongs_to :organization
  belongs_to :collection
  mount_uploader :pdf, PdfUploader
end
