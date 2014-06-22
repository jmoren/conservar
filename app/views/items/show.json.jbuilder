json.collection @item.collection, :id, :name, :description, :code
json.item do
  json.extract! @item, :id, :name, :description, :collection_id, :created_at, :updated_at
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
  json.treatments do
    json.open json.open @item.treatment_open?
    json.current json.current @item.current_treatment
    json.collection do
      json.array! @item.treatments do |treatment|
        json.id treatment.id
        json.item_id treatment.item_id
        json.diagnosis  treatment.diagnosis
        json.proposal   treatment.proposal
        json.closed_at  treatment.closed? ? treatment.closed_at : nil
        json.created_at  distance_of_time_in_words_to_now(treatment.created_at)
        json.updated_at distance_of_time_in_words_to_now(treatment.updated_at)
        json.closed treatment.closed?
      end
    end
  end
end