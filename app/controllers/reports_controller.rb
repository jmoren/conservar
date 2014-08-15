class ReportsController < ApplicationController
  before_action :set_collection, except: [:index]
  def index
    @reports = @organization.reports
  end

  def preview
    @collection = @organization.collections.find(params[:collection_id])
    @items = @collection.items
    treat_ids = @items.map {|i| i.treatment_to_report.try(:id) }.compact!
    @images = Image.where(treatment_id: [treat_ids])
    render layout: 'preview'
  end

  def create
    @report  = @collection.reports.new
    @report.organization_id = @organization.id
    file     = CollectionReportPdf.new(@collection, current_user.organization)
    tmp_path = "#{Rails.root}/tmp/automated_report_#{Time.now.to_i}.pdf"
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
    @collection = @organization.collections.joins(:items, :images, :treatments).find(params[:collection_id])
  end
end
