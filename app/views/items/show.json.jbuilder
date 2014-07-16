json.collection @item.collection, :id, :name, :description, :code
json.item do
  json.id @item.id
  json.name @item.name.titleize
  json.description @item.description
  json.collection_id @item.collection_id
  json.created_at @item.created_at
  json.updated_at @item.updated_at
  json.cover @item.cover_url
  json.materials do
    json.array! @item.item_details.materiales do |detail|
      json.extract! detail, :id, :name, :value, :detail_type
    end
  end
  json.medidas do
    json.array! @item.item_details.medidas do |detail|
      json.extract! detail, :id, :name, :value, :detail_type
    end
  end
  json.images do
    json.array!(@item.images) do |image|
      json.id image.id
      json.photo image.photo_url
      json.treatment image.treatment_id
    end
  end
  json.treatments do    
    json.array! @item.treatments do |treatment|
      json.id treatment.id
      json.show false
      json.closed  treatment.closed?
      json.created_at treatment.created_at.strftime('%d/%m/%Y')
      json.updated_at treatment.updated_at.strftime('%d/%m/%Y')
    end
  end
end