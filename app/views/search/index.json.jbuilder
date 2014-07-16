json.items do
  json.array!(@items) do |item|
    json.name item.name
    json.location "/items/#{item.id}"
    json.model 'item'
  end
end
json.collections do
  json.array!(@collections) do |collection|
    json.name collection.name
    json.location "/collections/#{collection.id}"
    json.model 'collection'
  end
end
