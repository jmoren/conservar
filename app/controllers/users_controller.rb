class UsersController < ApplicationController
  skip_before_filter :authenticate_user!, only: [:get_current_user]  
  def index
    @users = @organization.users
    respond_to do |format|
      format.json { render json: @users }
    end
  end
  def show
    @user = @organization.users.find(params[:id])
  end
  
  def profile
    @user = current_user
  end

  def update
    @user = @organization.users.find(params[:id])
    respond_to do |format|
      if @user.update(user_params)
        response = {
          id: current_user.id,
          email: current_user.email,
          name: current_user.name,
          last_name: current_user.last_name,
          organization: {
            id: current_user.organization.id,
            name: current_user.organization.name,
            address: current_user.organization.address,
            contact_email: current_user.organization.contact_email,
            phone: current_user.organization.phone
          }
        }
        format.json { render json: response }
      else
        format.json {render json: @user.errors }
      end
    end
  end

  def destroy
    begin
      @user = @organization.users.find(params[:id])
      if @user.destroy
        respond_to do |format|
          format.json { head :no_content }
        end
      end
    rescue ActiveRecord::RecordNotFound => e
      render status: 404, text: "You are trying to delete an inexistent admin"
    end
  end
  
  def get_current_user
    respond_to do |format|
      if current_user
        response = {
          id: current_user.id,
          email: current_user.email,
          name: current_user.name,
          last_name: current_user.last_name,
          organization: {
            id: current_user.organization.id,
            name: current_user.organization.name,
            address: current_user.organization.address,
            contact_email: current_user.organization.contact_email,
            phone: current_user.organization.phone
          }
        }
        format.json { render json: response }
      else
        format.json { render json: { } }
      end
    end
  end

  def user_params
    params.require(:user).permit(:name, :last_name)
  end
end