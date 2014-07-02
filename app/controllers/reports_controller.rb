class ReportsController < ApplicationController
  before_action :set_collection, except: [:index]
  def index
    @reports = Report.all
  end

  def create
    @report = @collection.reports.new 
    # generate file
    # upload file to report
    # save report
    respond_to do |format|
      format.json {render json: @report, status: :created }
    end
  end

  def show
    @report = @collection.report.find(params[:id])
    # send_data to client
  end

  def destroy
    @report = @collection.reports.find(params[:id])
    @report.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end
  
private
  def set_collection
    @collection = Collection.find(params[:collection_id])
  end
end