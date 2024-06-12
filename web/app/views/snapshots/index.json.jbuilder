# frozen_string_literal: true

json.set! :data do
  json.array! @snapshots do |snapshot|
    json.extract! snapshot, :id, :shop_id, :name, :created_at
    json.url snapshot_url(snapshot, format: :json)
  end
end
