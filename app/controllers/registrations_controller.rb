class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    build_resource(sign_up_params)
    
    resource_saved = resource.save
    if resource_saved
      respond_with resource
    else
      clean_up_passwords resource
      respond_with resource
    end
  end

  def update
    @user = User.find(params[:user][:id])
    params[:user].delete(:created_at)
    params[:user].delete(:updated_at)

    if params[:user][:password].blank?
      params[:user].delete(:password)
      params[:user].delete(:password_confirmation)
    end

    update_params = devise_parameter_sanitizer.sanitize(:account_update)

    if @user.update_attributes(update_params)
      respond_to do |format|
        format.json { render json: @user }
      end
    else
      render status: 422, text: "Error updating user"
    end
  end

  private
  def update_role_params
    params.require(:user).permit(:organization_id, :password, :password_confirmation, :name, :last_name)
  end
end