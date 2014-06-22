class ItemDetail < ActiveRecord::Base
  belongs_to :item

  scope :materiales, -> { where(detail_type: 'materiales')}
  scope :medidas, -> { where(detail_type: 'medidas')}
end
