json.collection do 
  json.id @collection.id
  json.name @collection.name.titleize
  json.description @collection.description
  json.code @collection.code
  json.created_at @collection.created_at
  json.updated_at @collection.updated_at
end
json.items do
  json.array!(@items) do |item|
    json.id item.id
    json.name item.name
    json.description item.description
    json.collection_id item.collection_id
    json.url collection_item_url(item.collection,item, format: :json)
  end 
end