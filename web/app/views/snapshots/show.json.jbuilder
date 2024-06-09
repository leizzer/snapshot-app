json.set! :data do
  json.extract! @snapshot, :id, :shop_id, :name, :created_at, :products
end
