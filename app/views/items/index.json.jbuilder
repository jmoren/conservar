json.collection @collection, :id, :name, :description
json.items do 
  json.array!(@items) do |item|
    json.extract! item, :id, :name, :description, :collection_id
  end
end
