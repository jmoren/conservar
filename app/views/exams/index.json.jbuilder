json.array!(@exams) do |exam|
  json.id exam.id
  json.name exam.name.titleize
  json.result exam.result
  json.observations exam.observations
  json.treatment_id exam.treatment_id
  json.item do 
    json.id exam.item.id
    json.name exam.item.name
  end
end