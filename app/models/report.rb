class Report < ActiveRecord::Base
  belongs_to :collection
  mount_uploader :pdf, PdfUploader
end
