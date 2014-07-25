class PdfReport < Prawn::Document

  # Often-Used Constants
  TABLE_ROW_COLORS = ["FFFFFF","DDDDDD"]
  TABLE_FONT_SIZE = 9
  TABLE_BORDER_STYLE = :grid

  def initialize(default_prawn_options={})
    super(default_prawn_options)
    font_size 10
  end

  def header(organization)
    text organization.name.titleize, style: :bold, size: 9
    move_up 10
    text "#{Date.today.strftime('%b %d, %A %Y')}", style: :bold, align: :right, size: 9
    stroke_color "f1f1f1"
    move_down 5
    stroke_horizontal_rule
  end

  def footer
    repeat(:all) do
      bounding_box [bounds.left, bounds.bottom + 30], :width  => bounds.width do
        stroke_color "f1f1f1"
        stroke_horizontal_rule
        move_down 5
        image "#{Rails.root}/app/assets/images/logo.png", :scale => 0.2
        move_up 10
        text "Automated Report", align: :right, size: 9
      end
    end
  end

end
