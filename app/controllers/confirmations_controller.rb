class ConfirmationsController < Devise::ConfirmationsController
  # Remove the first skip_before_filter (:require_no_authentication) if you
  # don't want to enable logged users to access the confirmation page.
  # skip_before_filter :require_no_authentication
  skip_before_filter :authenticate_user!
  respond_to :json

  # POST /resource/confirmation
  def create
    params.require(:email)
    resource_class.send_confirmation_instructions({email: params[:email]})
    render json: { status: :ok, text: "O email foi enviado com suceso!"}
  end

  # PUT /resource/confirmation
  def update
    with_unconfirmed_confirmable do
      if @confirmable.has_no_password?
        @confirmable.attempt_set_password(params[:user])
        if @confirmable.valid? and @confirmable.password_match?
          do_confirm
        else
          do_show
        end
      else
        self.class.add_error_on(self, :email, :password_already_set)
      end
    end
  end

  # GET /resource/confirmation?confirmation_token=abcdef
  def show
    with_unconfirmed_confirmable do
      if @confirmable.has_no_password?
        do_show
      else
        respond_with(@confirmable)
      end
    end
  end

  protected

  def with_unconfirmed_confirmable
    original_token = params[:confirmation_token]
    confirmation_token = Devise.token_generator.digest(User, :confirmation_token, original_token)
    @confirmable = User.find_or_initialize_with_error_by(:confirmation_token, confirmation_token)
    if !@confirmable.new_record?
      @confirmable.only_if_unconfirmed {yield}
    end
  end

  def do_show
    @confirmation_token = params[:confirmation_token]
    @requires_password = true
    self.resource = @confirmable
    respond_with(@confirmable)
  end

  def do_confirm
    @confirmable.confirm!
    sign_in(@confirmable)
    respond_with(@confirmable)
  end
end