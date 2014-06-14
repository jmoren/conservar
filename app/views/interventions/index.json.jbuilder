json.array!(@interventions) do |intervention|
  json.extract! intervention, :id, :treatment_id, :item_id, :description, :intervention_type
  json.url intervention_url(intervention, format: :json)
end
