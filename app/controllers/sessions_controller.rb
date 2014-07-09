class SessionsController < Devise::SessionsController
  skip_before_filter :verify_authenticity_token, :only => :create
  respond_to :json
end