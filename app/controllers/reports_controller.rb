class ReportsController < ApplicationController
  before_action :set_collection, except: [:index]
  def index
    @reports = Report.all
  end

  def create
    @report  = @collection.reports.new 
    file     = CollectionReportPdf.new(@collection)
    tmp_path = "#{Rails.root}/tmp/report_#{@collection.id}_#{Time.now.to_i}.pdf"
    file.render_file tmp_path
    respond_to do |format|
      if File.exists?(tmp_path)
        @report.pdf = File.open(tmp_path)  
        if @report.save
          format.json { render json: {
            id:         @report.id, 
            pdf:        @report.pdf_url, 
            created_at: @report.created_at.strftime('%d/%m/%Y'),
            collection: { 
              id:   @collection.id, 
              name: @collection.name
            } 
          }, 
          status: :created }
        else
          format.json { render json: @report.errors, status: :unprocessable_entity }
        end
        File.delete(tmp_path)
      else
        render status: 500, text: "Error generating report"
      end
    end
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