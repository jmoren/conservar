json.id @treatment_note.id
json.content @treatment_note.content
json.created_at distance_of_time_in_words_to_now(@treatment_note.created_at)
