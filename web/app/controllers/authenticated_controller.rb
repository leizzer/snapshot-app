# frozen_string_literal: true

class AuthenticatedController < ApplicationController
  include ShopifyApp::EnsureHasSession

  private

  def current_shop
    Shop.find_by_shopify_domain current_shopify_session.shop
  end
end
