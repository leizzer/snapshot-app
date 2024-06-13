# frozen_string_literal: true

class Schedule < ApplicationRecord
  belongs_to :shop
  has_many :snapshots, through: :shop

  enum recurring: {
    disabled: 0,
    daily: 1,
    weekly: 2,
    monthly: 3
  }
end
