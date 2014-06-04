json.item @item, :id, :name, :description, :collection_id, :created_at, :updated_at
json.collection @item.collection, :id, :name, :description, :code
