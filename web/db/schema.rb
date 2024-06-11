# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_06_11_014128) do
  create_table "products", force: :cascade do |t|
    t.integer "snapshot_id", null: false
    t.string "shopify_product_id", null: false
    t.string "title", null: false
    t.string "vendor"
    t.string "product_type"
    t.string "status"
    t.string "handle"
    t.json "data", null: false
    t.datetime "shopify_created_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["snapshot_id"], name: "index_products_on_snapshot_id"
  end

  create_table "schedules", force: :cascade do |t|
    t.integer "shop_id", null: false
    t.integer "recurring", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shop_id"], name: "index_schedules_on_shop_id"
  end

  create_table "shops", force: :cascade do |t|
    t.string "shopify_domain", null: false
    t.string "shopify_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "access_scopes"
    t.index ["shopify_domain"], name: "index_shops_on_shopify_domain", unique: true
  end

  create_table "snapshots", force: :cascade do |t|
    t.integer "shop_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "automatic", default: false
    t.index ["shop_id"], name: "index_snapshots_on_shop_id"
  end

  add_foreign_key "products", "snapshots"
  add_foreign_key "schedules", "shops"
  add_foreign_key "snapshots", "shops"
end
