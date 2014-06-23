json.array!(@treatment_notes) do |treatment_note|
  json.extract! treatment_note, :id, :treatment_id, :content
  json.url treatment_note_url(treatment_note, format: :json)
end
