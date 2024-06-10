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
      products_attributes: parsed_shopify_products
    )

    if @snapshot.save
      @snapshot
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

  # Only allow a list of trusted parameters through.
  def snapshot_params
    params.require(:data).permit(:name)
  end

  def restore_params
    params.require(:data).permit(product_ids: [])
  end
end
