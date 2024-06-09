# frozen_string_literal: true

class Snapshot < ApplicationRecord
  belongs_to :shop
  has_many :products, dependent: :destroy

  validates :name, presence: true

  accepts_nested_attributes_for :products
end
