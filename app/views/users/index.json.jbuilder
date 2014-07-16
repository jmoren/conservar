json.array!(@users) do |user|
  json.id         user.id
  json.email      user.email
  json.name       user.name
  json.last_name  user.last_name
  json.confirmed  user.confirmation_token.nil?
end