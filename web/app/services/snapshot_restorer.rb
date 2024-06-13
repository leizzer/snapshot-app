# frozen_string_literal: true

class SnapshotRestorer < ApplicationService
  def initialize(product_ids:, snapshot:, session: nil)
    super
    @snapshot = snapshot
    @product_ids = product_ids
  end

  def call
    products.find_each(batch_size: 10) do |product|
      restore(product)
    end
  end

  private

  def restore(product)
    data = JSON.parse(product.data)

    begin
      shopify_product = ShopifyAPI::Product.new(from_hash: data)
      shopify_product.save!
    rescue ShopifyAPI::Errors::HttpResponseError => e
      data.delete("id") # remove id to create a new product
      shopify_product = ShopifyAPI::Product.new(from_hash: data)
      shopify_product.save!
    end
  end

  def products
    @snapshot.products.where(id: @product_ids)
  end
end
