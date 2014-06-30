class ExamsController < ApplicationController
  before_action :set_treatment, except: [:index]

  def index
    @exams = Exam.all
  end

  def create
    @exam = @treatment.exams.new(exam_params)
    respond_to do |format|
      if @exam.save
        format.json { render :show, status: :created}
      else
        format.json { render json: @exam.errors }
      end
    end
  end

  def update
    @exam = @treatment.exams.find(params[:id])
    respond_to do |format|
      if @exam.update(exam_params)
        format.json { render :show, status: :ok}
      else
        format.json { render json: @exam.errors }
      end
    end
  end

  def destroy
    @exam = @treatment.exams.find(params[:id])
    respond_to do |format|
      @exam.destroy
      format.json { head :no_content }
    end
  end

private
  def set_treatment
    @treatment = Treatment.find(params[:treatment_id])
  end

  def exam_params
    params.require(:exam).permit(:item_id, :treatment_id, :name, :result, :observations)
  end
end