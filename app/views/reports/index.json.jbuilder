json.array!(@reports) do |report|
  json.id         report.id
  json.created_at report.created_at.strftime('%d/%m/%Y')
  json.pdf        report.pdf_url
  json.collection do
    json.id report.collection_id
    json.name report.collection.name
  end
end