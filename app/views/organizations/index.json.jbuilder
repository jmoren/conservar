json.array!(@organizations) do |organization|
  json.extract! organization, :id, :name, :address, :contact_email, :phone
  json.url organization_url(organization, format: :json)
end
