json.id @intervention.id
json.treatment_id @intervention.treatment_id
json.item_id @intervention.item_id
json.description @intervention.description
json.intervention_type @intervention.intervention_type
json.intervention_date @intervention.intervention_date.strftime('%d/%m/%Y')
json.materials @intervention.materials
