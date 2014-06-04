class ItemDetailsController < ApplicationController
  before_action :set_item
  respond_to :json
  def index
    @item_details = @item.item_details
    respond_with(@item_details)
  end

  def create
    @detail = @item.item_details.new(safe_params)
    if @detail.save
      render json: @detail
    else
      render json: @detail.errors
    end
  end

  def update
    @detail = @item.item_details.find(params[:id])
    if @detail.update(safe_params)
      render json: @detail
    else
      render json: @detail.errors
    end
  end

  def destroy
    @detail = @item.item_details.find(params[:id])
    @detail.destroy

    render json: {head: :ok}
  end
protected
  def set_item
    @item = Item.find(params[:item_id])
  end

  def safe_params
    params[:item_detail].delete(:id) if params[:item_detail]
    params.require(:item_detail).permit(:value, :name, :detail_type)
  end
end
