json.array!(@images) do |image|
  json.id image.id
  json.description image.description
  json.photo image.photo_url
  json.item do
    json.id image.item.id
    json.name image.item.name
    json.url item_path(image.item)
  end
  json.treatment do
    json.id image.treatment.id
    json.url item_treatment_path(image.item, image.treatment)
  end
  json.intervention do
    json.id image.intervention ? image.intervention.id : null
  end
end
