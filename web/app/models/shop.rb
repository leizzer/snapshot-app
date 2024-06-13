# frozen_string_literal: true

class Shop < ActiveRecord::Base
  include ShopifyApp::ShopSessionStorageWithScopes

  has_many :snapshots, dependent: :destroy
  has_one :schedule, dependent: :destroy

  after_create :create_schedule

  def api_version
    ShopifyApp.configuration.api_version
  end
end
