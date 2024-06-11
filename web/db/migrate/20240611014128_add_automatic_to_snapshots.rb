class AddAutomaticToSnapshots < ActiveRecord::Migration[7.0]
  def change
    add_column :snapshots, :automatic, :boolean, default: false
  end
end
