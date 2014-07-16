class TreatmentsController < ApplicationController
  before_action :set_item, except: [:index]
  before_action :set_treatment, only: [:show, :update, :destroy, :close, :open]

  # GET /treatments
  # GET /treatments.json
  def index
    @treatments = @organization.treatments
  end

  # GET /treatments/1
  # GET /treatments/1.json
  def show
  end

  # POST /treatments
  # POST /treatments.json
  def create
    @treatment = @item.treatments.new(treatment_params)
    @treatment.organization_id = @organization.id
    respond_to do |format|
      if @treatment.save
        format.html { redirect_to @treatment, notice: 'Treatment was successfully created.' }
        format.json { render :show, status: :created, location: item_treatment_path(@item, @treatment) }
      else
        format.html { render :new }
        format.json { render json: @treatment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /treatments/1
  # PATCH/PUT /treatments/1.json
  def update
    respond_to do |format|
      if @treatment.update(treatment_params)
        format.html { redirect_to @treatment, notice: 'Treatment was successfully updated.' }
        format.json { render :show, status: :ok }
      else
        format.html { render :edit }
        format.json { render json: @treatment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /treatments/1
  # DELETE /treatments/1.json
  def destroy
    @treatment.destroy
    respond_to do |format|
      format.html { redirect_to treatments_url, notice: 'Treatment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def open
    @treatment.open!
    respond_to do |format|
      format.json { render :show, status: :ok }
    end
  end

  def close
    @treatment.close!
    respond_to do |format|
      format.json { render :show, status: :ok }
    end
  end
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_treatment
      @treatment = @item.treatments.find(params[:id])
    end

    def set_item
      @item = @organization.items.find(params[:item_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def treatment_params
      params[:treatment].delete(:id)
      params[:treatment].delete(:created_at)
      params[:treatment].delete(:updated_at)
      params.require(:treatment).permit(:item_id, :diagnosis, :proposal, :closed_at)
    end
end
