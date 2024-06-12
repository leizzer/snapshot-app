# frozen_string_literal: true

class SnapshotsController < AuthenticatedController
  # GET /snapshots or /snapshots.json
  def index
    @snapshots = current_shop.snapshots
  end

  # GET /snapshots/1 or /snapshots/1.json
  def show
    @snapshot = current_shop.snapshots
                            .includes(:products)
                            .find_by_id(params[:id])
  end

  # GET /snapshots/new
  def new
    @snapshot = current_shop.snapshots.new(
      name: DateTime.now.to_s,
      products_attributes: parsed_shopify_products
    )
  end

  # POST /snapshots or /snapshots.json
  def create
    @snapshot = current_shop.snapshots.new(
      name: snapshot_params[:name],
      products_attributes: parsed_shopify_products(snapshot_params[:product_ids])
    )

    if @snapshot.save
      render :show
    else
      render json: @snapshot.errors, status: :unprocessable_entity
    end
  end

  # DELETE /snapshots/1 or /snapshots/1.json
  def destroy
    @snapshot = current_shop.snapshots.find_by_id(params[:id])

    @snapshot.destroy!

    head :no_content
  end

  def restore
    SnapshotRestorer.call(
      product_ids: restore_params[:product_ids],
      snapshot: current_shop.snapshots.find_by_id(params[:id])
    )

    head :no_content
  end

  private

  def shopify_products(ids=[])
    ShopifyAPI::Product.all(ids: ids.join(","))
  end

  def parsed_shopify_products(ids=[])
    shopify_products(ids).map do |product|
      Product.attributes_from_shopify_product(product)
    end
  end

  # Only allow a list of trusted parameters through.
  def snapshot_params
    params.require(:data).permit(:name, product_ids: [])
  end

  def restore_params
    params.require(:data).permit(product_ids: [])
  end
end
