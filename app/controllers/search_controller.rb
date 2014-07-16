class SearchController < ApplicationController
    respond_to :json

  def index
    if params[:q]
      @items = search_items(params[:q])
      @collections = search_collections(params[:q])
    end
  end

private

  def search_items(value)
    Item.where('name LIKE ?', "%#{value}%")
  end

  def search_collections(value)    
    Collection.where('name LIKE ?', "%#{value}%")
  end
end