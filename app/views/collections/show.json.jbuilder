json.collection do
  json.id @collection.id
  json.name @collection.name
  json.description @collection.description
  json.reportable @reportable
  json.origin @collection.origin
  json.owner @collection.owner
  json.entry_date @collection.entry_date.nil? ? '' : @collection.entry_date.strftime('%B %d, %Y')

end
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
    json.id report.id
    json.collection_id report.collection_id
    json.created_at report.created_at.strftime('%d/%m/%Y')
    json.total_downloads
    json.pdf report.pdf_url
  end
end
