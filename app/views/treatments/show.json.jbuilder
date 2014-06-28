json.treatment do
  json.id @treatment.id
  json.item_id @treatment.item_id
  json.diagnosis @treatment.diagnosis
  json.proposal  @treatment.proposal
end
json.status do
  json.closed_at @treatment.closed? ? distance_of_time_in_words_to_now(@treatment.closed_at) : nil
  json.created_at distance_of_time_in_words_to_now(@treatment.created_at)
  json.updated_at distance_of_time_in_words_to_now(@treatment.updated_at)
  json.closed @treatment.closed?
end
json.item do
  json.name @treatment.item.name.titleize
end
json.notes do
  json.array!(@treatment.treatment_notes) do |note|
    json.id note.id
    json.content note.content
    json.created_at distance_of_time_in_words_to_now(note.created_at)
  end
end
json.images do
  json.array!(@treatment.images) do |image|
    json.id image.id
    json.photo image.photo_url
    json.description truncate(image.description, length:30)
    json.intervention do
      json.id image.intervention_id
    end
  end
end
json.interventions do
  json.array!(@treatment.interventions) do |intervention|
    json.extract! intervention, :id, :description, :created_at, :intervention_type
  end
end
