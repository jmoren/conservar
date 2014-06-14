json.array!(@treatments) do |treatment|
  json.id treatment.id
  json.item_id treatment.item_id
  json.diagnosis treatment.diagnosis
  json.proposal treatment.proposal
  json.time_ago distance_of_time_in_words_to_now(treatment.created_at)
  json.url item_treatment_path(treatment.item, treatment, format: :json)
end
