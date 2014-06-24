json.array! @treatments do |treatment|
  json.id treatment.id
  json.item do
    json.id treatment.item_id
    json.name treatment.item.name
    json.description treatment.item.description
  end
  json.diagnosis  treatment.diagnosis
  json.proposal   treatment.proposal
  json.closed_at  treatment.closed? ? treatment.closed_at : nil
  json.created_at  distance_of_time_in_words_to_now(treatment.created_at)
  json.updated_at distance_of_time_in_words_to_now(treatment.updated_at)
end