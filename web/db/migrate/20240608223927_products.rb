class Products < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.references :snapshot, null: false, foreign_key: true
      t.string :shopify_product_id, null: false
      t.string :title, null: false
      t.string :vendor
      t.string :product_type
      t.string :staus
      t.string :handle
      t.json   :data, null: false
      t.datetime :published_at, null: false
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false
    end
  end
end
