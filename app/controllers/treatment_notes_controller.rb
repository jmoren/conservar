class TreatmentNotesController < ApplicationController
  before_action :set_treatment
  before_action :set_treatment_note, only: [:show, :edit, :update, :destroy]

  # GET /treatment_notes
  # GET /treatment_notes.json
  def index
    @treatment_notes = TreatmentNote.all
  end

  # GET /treatment_notes/1
  # GET /treatment_notes/1.json
  def show
  end

  # GET /treatment_notes/1/edit
  def edit
  end

  # POST /treatment_notes
  # POST /treatment_notes.json
  def create
    @treatment_note = @treatment.treatment_notes.new(treatment_note_params)

    respond_to do |format|
      if @treatment_note.save
        format.html { redirect_to @treatment_note, notice: 'Treatment note was successfully created.' }
        format.json { render :show, status: :created }
      else
        format.html { render :new }
        format.json { render json: @treatment_note.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /treatment_notes/1
  # PATCH/PUT /treatment_notes/1.json
  def update
    respond_to do |format|
      if @treatment_note.update(treatment_note_params)
        format.html { redirect_to @treatment_note, notice: 'Treatment note was successfully updated.' }
        format.json { render :show, status: :ok, location: @treatment_note }
      else
        format.html { render :edit }
        format.json { render json: @treatment_note.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /treatment_notes/1
  # DELETE /treatment_notes/1.json
  def destroy
    @treatment_note.destroy
    respond_to do |format|
      format.html { redirect_to treatment_notes_url, notice: 'Treatment note was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_treatment
      @treatment = Treatment.find(params[:treatment_id])
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_treatment_note
      @treatment_note = @treatment.treatment_notes.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def treatment_note_params
      params.require(:treatment_note).permit(:treatment_id, :content)
    end
end
