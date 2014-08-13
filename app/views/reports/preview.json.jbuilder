json.app do
  json.logo '/assets/logo.png'
  json.date Date.today
end

json.organization do
  json.name @organization.name
  json.contact_email @organization.contact_email
  json.phone @organization.phone
  json.address @organization.address
end

json.object do
  json.name         @collection.name
  json.description  @collection.description
  json.owner        @collection.owner
  json.origin       @collection.origin
  json.entry_date   @collection.entry_date

  json.items do
    json.array!(@items) do |item|
      json.name item.name
      treatment = 
      json.treatments do
        json.extract! item.treatments.last, :diagnosis, :proposal
      end
      json.exams do
        json.array!(item.treatments.last.exams) do |exam|
          json.extract! exam, :name, :result, :observations
        end
      end
      json.interventions do
        json.array!(item.treatments.last.interventions) do |intervention|
          json.extract! intervention, :description, :intervention_type, :intervention_date, :materials
        end
      end
      json.images do
        json.array!(item.treatments.last.images) do |image|
          json.url image.photo_url
        end
      end
    end
  end
end
