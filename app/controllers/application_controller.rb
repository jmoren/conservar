class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :configure_permitted_parameters, if: :devise_controller?
  before_filter :authenticate_user!
  before_filter :set_organization
  before_filter :set_locale
  after_filter  :set_csrf_cookie_for_ng

  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

  rescue_from ActionController::InvalidAuthenticityToken do |exception|
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
    render :text => 'invalid token', :status => :unprocessable_entity
  end

  def set_organization
    return if current_user.nil?
    @organization = current_user.organization
    session[:lang] = current_user.lang
  end

  def set_locale
    I18n.locale = current_user.try(:lang) || I18n.default_locale
  end
protected
  def verified_request?
    super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) do |u|
      u.permit(:email, :password, :organization_id, :password_confirmation, :name, :last_name)
    end
  end
end
