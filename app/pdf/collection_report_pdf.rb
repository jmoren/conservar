class CollectionReportPdf < PdfReport
  ACTIONS_TABLE_WIDTHS = [150, 700, 100]
  ACTIONS_TABLE_HEADERS = ["Tipo", "Descricao", "Date"]

  EXAMS_TABLE_WIDTHS = [150, 350, 350, 100]
  EXAMS_TABLE_HEADERS = ["Nome", "Result", "Observacoes", "Date"]

  def initialize(collection)
    super()
    @collection = collection

    header 
    report_collection(collection)
    collection.items.each do |item|
      treatment = item.treatments.last
      item_introduction(item, treatment) if treatment
    end
    footer
  end

  private

  def display_actions_table(actions)
    table_data = actions_table_data(actions)
    unless table_data.empty?
      pad(10) { text "Intervencoes feitos", size: 11, style: :bold }
      table_data.unshift(ACTIONS_TABLE_HEADERS)
      table table_data,
        header: true, :width => 500, :cell_style => {:padding => 12}
      move_down 10
      stroke_horizontal_rule
    end  
  end

  def display_exams_table(exams)
    table_data = exams_table_data(exams)
    unless table_data.empty?
      pad(10) { text "Analises feitos", size: 11, style: :bold }
      table_data.unshift(EXAMS_TABLE_HEADERS)
      table table_data,
        header: true, :width => 500, :cell_style => {:padding => 12}
      move_down 10
      stroke_horizontal_rule
    end
  end

  def item_introduction(item, treatment)
    pad(10) { text item.name, size: 14, style: :bold, color: "#666566" }
    pad_top(15) do
      text "Diagnostico", size: 12, style: :bold  
      pad(10) { text treatment.diagnosis }
    end
    stroke_color "f1f1f1"
    stroke_horizontal_rule

    pad_top(15) do
      text "Proposta de tratamento", size: 12, style: :bold
      pad(10) { text treatment.proposal }
    end
    stroke_color "f1f1f1"
    stroke_horizontal_rule
    move_down 20

    display_actions_table(treatment.interventions)
    display_exams_table(treatment.exams)
  end

  def actions_table_data(actions)
    actions.map { |e| [e.intervention_type, e.description, e.created_at.strftime("%m/%d/%y")] }
  end

  def exams_table_data(exams)
    exams.map { |e| [e.name, e.result, e.observations, e.created_at.strftime("%m/%d/%y")] }
  end

end