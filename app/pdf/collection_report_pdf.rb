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
      treatment = item.treatments.open.last
      if treatment
        item_introduction(item, treatment) 
        start_new_page unless collection.items.last == item
      end
    end
    footer
  end

  private

  def display_actions(actions)
    unless actions.empty?
      pad_top(20) { text "Intervencoes feitas", size: 13, style: :bold }
      actions.each do |action|
        move_down 20
        y_position = cursor
        bounding_box([0, y_position], :width => 150) do
          text action.intervention_type.titleize, style: :bold, size: 11
          move_down 10
          text action.intervention_date.strftime('%d/%m/%Y'), size: 10
        end
        bounding_box([190, y_position], :width => 350) do
          text action.description, size: 11
          move_down 10
          stroke_color "f1f1f1"
          stroke_horizontal_rule
          move_down 10
          text "Materials: #{action.materials || 'n/a'}", size: 11
        end
        move_down 10
        stroke_color "f1f1f1"
        stroke_horizontal_rule
      end
    end  
  end

  def display_exams(exams)
    unless exams.empty?
      pad_top(20) { text "Analises feitos", size: 13, style: :bold }
      exams.each do |exam|
        move_down 20
        y_position = cursor
        bounding_box([0, y_position], :width => 150) do
          text exam.name.titleize, style: :bold, size: 11
          move_down 10
          text exam.created_at.strftime('%d/%m/%Y'), size: 10
        end
        bounding_box([190, y_position], :width => 350) do
          text exam.result, size: 11
          move_down 10
          stroke_color "f1f1f1"
          stroke_horizontal_rule
          move_down 15
          text "Observations: #{exam.observations}", size: 11
        end
        move_down 10
        stroke_color "f1f1f1"
        stroke_horizontal_rule
      end
    end
  end

  def item_introduction(item, treatment)
    pad_top(20) { text item.name.titleize, size: 15, style: :bold, color: "#666566" }

    # diagnosis text
    move_down 20  
    y_position = cursor
    bounding_box([0, y_position], :width => 150) do
      text "Diagnostico", size: 13, style: :bold  
    end
    bounding_box([190, y_position], :width => 350) do
      text treatment.diagnosis
    end
    move_down 20
    stroke_color "f1f1f1"
    stroke_horizontal_rule
    
    # proposal text
    move_down 20
    y_position = cursor
    bounding_box([0, y_position], :width => 150) do
      text "Proposta de tratamento", size: 13, style: :bold
    end
    bounding_box([190, y_position], :width => 350) do
      text treatment.proposal
    end
    move_down 20
    stroke_color "f1f1f1"
    stroke_horizontal_rule

    # data
    display_actions(treatment.interventions)
    display_exams(treatment.exams)
  end
end