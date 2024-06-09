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
end
