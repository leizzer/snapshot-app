class SnapshotJob < ApplicationJob
  queue_as :default

  def perform(shop_id:)
    shop = Shop.find(shop_id)

    shop.with_shopify_session do |session|
      @shopify_products = shopify_products_for(session)

      @snapshot = current_shop.snapshots.new(
        name: "Scheduled - #{DateTime.now.to_s}",
        automatic: true,
        products_attributes: parsed_shopify_products
      )
    end
  end

  private

  def shopify_products_for(session)
    ShopifyAPI::Product.all(session: session)
  end

  def parsed_shopify_products
    @shopify_products.map do |product|
      Product.attributes_from_shopify(product)
    end
  end
end
