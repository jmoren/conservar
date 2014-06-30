json.id           @exam.id
json.name         @exam.name
json.result       truncate(@exam.result, length: 30)
json.observations truncate(@exam.observations, length: 30)
json.created_at   distance_of_time_in_words_to_now(@exam.created_at)