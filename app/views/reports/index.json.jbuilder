json.array!(@reports) do |report|
  json.id report.id
  json.total report.total_downloads
  json.created_at report.created_at
  json.collection do
    json.id report.collection_id
    json.name report.collection.name
  end
end