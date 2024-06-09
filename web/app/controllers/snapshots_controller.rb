# frozen_string_literal: true
#
class SnapshotsController < AuthenticatedController
  before_action :set_snapshot, only: %i[ show edit update destroy ]

  # GET /snapshots or /snapshots.json
  def index
    @snapshots = current_shop.snapshots
  end

  # GET /snapshots/1 or /snapshots/1.json
  def show
    #TODO
  end

  # GET /snapshots/new
  def new
    @snapshot = Snapshot.new(
      shop_id: current_shop.id,
      name: DateTime.now.to_s,
      products_attributes: parsed_shopify_products
    )
  end

  # GET /snapshots/1/edit
  def edit
    #TODO - I think we dont need it
  end

  # POST /snapshots or /snapshots.json
  def create
    @snapshot = Snapshot.new(
      shop_id: current_shop.id,
      name: snapshot_params[:name],
      products_attributes: parsed_shopify_products
    )

    if @snapshot.save
      format.json { render :show, status: :created, url: @snapshot }
    else
      format.json { render json: @snapshot.errors, status: :unprocessable_entity }
    end
  end

  # PATCH/PUT /snapshots/1 or /snapshots/1.json
  def update
    respond_to do |format|
      if @snapshot.update(snapshot_params)
        format.html { redirect_to snapshot_url(@snapshot), notice: "Snapshot was successfully updated." }
        format.json { render :show, status: :ok, location: @snapshot }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @snapshot.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /snapshots/1 or /snapshots/1.json
  def destroy
    @snapshot.destroy

    respond_to do |format|
      format.html { redirect_to snapshots_url, notice: "Snapshot was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  def shopify_products
    ShopifyAPI::Product.all
  end

  def parsed_shopify_products
    shopify_products.map do |product|
      {
        shopify_product_id: product.id,
        shopify_created_at: product.created_at,
        title: product.title,
        vendor: product.vendor,
        product_type: product.product_type,
        status: product.status,
        handle: product.handle,
        data: product.to_json
      }
    end
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_snapshot
    @snapshot = Snapshot.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def snapshot_params
    params.require(:data).permit(:name)
  end
end
