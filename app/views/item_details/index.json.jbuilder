json.array! @item_details do |detail|
  json.extract! detail, :id, :name, :value, :detail_type
end