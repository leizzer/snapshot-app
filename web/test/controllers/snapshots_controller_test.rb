require "test_helper"


class SnapshotsControllerTest < ActionDispatch::IntegrationTest
  include ShopifyApp::TestHelpers::ShopifySessionHelper

  test "should get index" do
    shop_domain = "my-shop.myshopify.com"
    setup_shopify_session(
      session_id: "1",
      shop_domain: shop_domain
    )


    get snapshots_url

    @snapshot1 = snapshots(:one)
    @snapshot2 = snapshots(:two)

    assert_equal parsed_body,
      {
        "data" => [
          hashed(@snapshot1),
          hashed(@snapshot2)
        ]
      }

    assert_response :success
  end

  test "should get new" do
    get new_snapshot_url
    assert_response :success
  end

  test "should create snapshot" do
    login
    assert_difference("Snapshot.count") do
      post snapshots_url, params: { snapshot: {  } }
    end

    assert_redirected_to snapshot_url(Snapshot.last)
  end

  test "should show snapshot" do
    get snapshot_url(@snapshot)
    assert_response :success
  end

  test "should get edit" do
    get edit_snapshot_url(@snapshot)
    assert_response :success
  end

  test "should update snapshot" do
    patch snapshot_url(@snapshot), params: { snapshot: {  } }
    assert_redirected_to snapshot_url(@snapshot)
  end

  test "should destroy snapshot" do
    assert_difference("Snapshot.count", -1) do
      delete snapshot_url(@snapshot)
    end

    assert_redirected_to snapshots_url
  end

  private

  def parsed_body
    JSON.parse(response.body)
  end

  def hashed(object)
    {
      "id" => object.id,
      "shop_id" => object.shop_id,
      "name" => object.name,
      "created_at" => object.created_at.as_json,
      "url" => snapshot_url(object)
    }
  end
end
