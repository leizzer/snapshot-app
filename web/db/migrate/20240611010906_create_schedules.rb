class CreateSchedules < ActiveRecord::Migration[7.0]
  def change
    create_table :schedules do |t|
      t.references :shop, null: false, foreign_key: true
      t.integer :recurring, null: false, default: 0
      t.timestamps
    end
  end
end
