# frozen_string_literal: true

class Product < ActiveRecord
  belongs_to :snapshot

  validates :title, presence: true
  validates :price, presence: true
  validates :data, presence: true
  validates :vendor, presence: true
  validates :product_type, presence: true
  validates :staus, presence: true
  validates :handle, presence: true
  validates :data, presence: true
  validates :published_at, presence: true
end
