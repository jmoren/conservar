json.array!(@images) do |image|
  json.extract! image, :id, :item_id, :treatment_id, :description
  json.url image_url(image, format: :json)
end
