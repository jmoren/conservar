class Collection < ActiveRecord::Base
  has_many :items, dependent: :destroy
  has_many :reports, dependent: :nullify
end
