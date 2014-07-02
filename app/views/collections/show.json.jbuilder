json.collection @collection, :id, :name, :description
json.items do 
  json.array!(@collection.items) do |item|
    json.id item.id
    json.name item.name
    json.description item.description
    json.collection_id item.collection_id
    json.cover item.cover.url
  end
end
json.reports do
  json.array!(@collection.reports) do |report|
    json.date report.created_at
    json.total_downloads
  end
end
