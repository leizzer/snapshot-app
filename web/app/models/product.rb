# frozen_string_literal: true

class Product < ApplicationRecord
  belongs_to :snapshot

  validates :title, presence: true
  validates :data, presence: true
  validates :vendor, presence: true
  validates :status, presence: true
  validates :handle, presence: true
  validates :data, presence: true
  validates :shopify_created_at, presence: true

  def self.attributes_from_shopify_product(product)
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
