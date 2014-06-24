json.collection @collection, :id, :name, :description
json.items do 
  json.array!(@collection.items) do |item|
    json.extract! item, :id, :name, :description, :collection_id, :cover
  end
end
