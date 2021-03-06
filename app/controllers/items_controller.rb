class ItemsController < ApplicationController
  before_action :set_item, only: [:show, :edit, :update, :destroy]

  # GET /items
  # GET /items.json
  def index
    @items = @collection.items
  end

  # GET /items/1
  # GET /items/1.json
  def show
  end

  # GET /items/new
  def new
    @item = @organization.items.new
  end

  # GET /items/1/edit
  def edit
  end

  # POST /items
  # POST /items.json
  def create
    @collection = @organization.collections.find(params[:collection_id])
    @item = @collection.items.new(item_params)
    @item.organization_id = @organization.id
    respond_to do |format|
      if @item.save
        format.html { redirect_to @item, notice: 'Item was successfully created.' }
        format.json { render :show, status: :created }
      else
        format.html { render :new }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /items/1
  # PATCH/PUT /items/1.json
  def update
    respond_to do |format|
      if @item.update(item_params)
        format.html { redirect_to @item, notice: 'Item was successfully updated.' }
        format.json { render :show, status: :ok, location: @item }
      else
        format.html { render :edit }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /items/1
  # DELETE /items/1.json
  def destroy
    @item.destroy
    respond_to do |format|
      format.html { redirect_to items_url, notice: 'Item was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def upload
    @collection = @organization.collections.find(params[:collection_id])
    @item = @collection.items.find(params[:id])
    respond_to do |format|
      if @item.update(cover_params)
        format.html { redirect_to @item, notice: 'Item was successfully updated.' }
        format.json { render :show, status: :ok, location: @item }
      else
        format.html { render :edit }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end
  private

    def cover_params
      params.require(:item).permit(:cover)
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_item
      @item = @organization.items.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def item_params
      params[:item].delete(:id)
      params[:item].delete(:images)
      params[:item].delete(:created_at)
      params[:item].delete(:updated_at)
      params.require(:item).permit(:name, :description, :collection_id, :cover)
    end
end
