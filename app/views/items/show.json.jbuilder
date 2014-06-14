json.item @item, :id, :name, :description, :collection_id, :created_at, :updated_at
json.treatments do
  json.open @item.treatment_open?
  json.current @item.current_treatment
end
json.collection @item.collection, :id, :name, :description, :code
