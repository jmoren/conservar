class PdfReport < Prawn::Document

  # Often-Used Constants
  TABLE_ROW_COLORS = ["FFFFFF","DDDDDD"]
  TABLE_FONT_SIZE = 9
  TABLE_BORDER_STYLE = :grid

  def initialize(default_prawn_options={})
    super(default_prawn_options)
    font_size 10
  end

  def header
    text "Conservar App", style: :bold, size: 9
    move_up 10
    text "Automated Report - #{Date.today.strftime('%b %d, %A %Y')}", style: :bold, align: :right, size: 9
    stroke_color "f1f1f1"
    move_down 5
    stroke_horizontal_rule
  end

  def report_collection(collection)
    pad_top(20) { text collection.name, size: 14, style: :bold_italic, align: :center }
    # collection data
  end

  def footer
    # ...
  end

  def find_path(treatment)
    path = "#{Rails.root}/app/assets/reports/#{treatment.id}/report.pdf"
  end

  # ... More helpers
end