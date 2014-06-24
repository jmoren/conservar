json.treatment do
  json.id @treatment.id
  json.item do
    json.id @treatment.item_id
    json.name @treatment.item.name
  end
  json.diagnosis @treatment.diagnosis
  json.proposal  @treatment.proposal
  json.closed_at @treatment.closed? ? distance_of_time_in_words_to_now(@treatment.closed_at) : nil
  json.created_at distance_of_time_in_words_to_now(@treatment.created_at)
  json.updated_at distance_of_time_in_words_to_now(@treatment.updated_at)
  json.closed @treatment.closed?
  json.notes do
    json.array!(@treatment.treatment_notes) do |note|
      json.content note.content
    end
  end
  json.interventions do
    json.array!(@treatment.interventions) do |intervention|
      json.extract! intervention, :id, :description, :created_at, :intervention_type
    end
  end
end
