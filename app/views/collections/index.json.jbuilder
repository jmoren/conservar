json.array!(@collections) do |collection|
  json.extract! collection, :id, :name, :description, :owner, :origin
  json.entry_date collection.entry_date.nil? ? '' : collection.entry_date.strftime('%d/%m/%Y')
  json.url collection_url(collection, format: :json)
end
