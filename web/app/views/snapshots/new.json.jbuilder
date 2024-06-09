json.set! :data do
  json.extract! @snapshot, :shop_id, :id, :name, :products
end
