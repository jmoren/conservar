json.array!(@collections) do |collection|
  json.extract! collection, :id, :name, :description, :code
  json.url collection_url(collection, format: :json)
end
