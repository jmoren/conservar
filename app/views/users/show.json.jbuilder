json.id         @user.id
json.email      @user.email
json.name       @user.name
json.last_name  @user.last_name
json.organization do
  json.id             @user.organization.id
  json.name           @user.organization.name
  json.address        @user.organization.address
  json.contact_email  @user.organization.contact_email
  json.phone          @user.organization.phone
end