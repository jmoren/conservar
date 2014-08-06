class UsersController < ApplicationController
  skip_before_filter :authenticate_user!, only: [:get_current_user]
  respond_to :json

  def index
    @users = @organization.users
  end

  def show
    @user = @organization.users.find(params[:id])
  end

  def profile
    @user = current_user
    respond_to do |format|
      format.json { render :show, status: :ok }
    end
  end

  def update
    @user = @organization.users.find(params[:id])
    respond_to do |format|
      if @user.update(user_params)
        format.json { render :show, status: :ok }
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
    @user = current_user
    respond_to do |format|
      if @user
        format.json { render :show }
      else
        format.json { head :no_content }
      end
    end
  end

  def user_params
    params.require(:user).permit(:name, :last_name, :lang)
  end
end
