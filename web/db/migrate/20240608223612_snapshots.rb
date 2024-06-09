class Snapshots < ActiveRecord::Migration[7.0]
  def change
    create_table :snapshots do |t|
      t.references :shop, null: false, foreign_key: true
      t.string :name, null: false
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false
    end
  end
end
