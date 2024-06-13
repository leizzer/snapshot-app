# frozen_string_literal: true

json.set! :data do
  json.extract! @snapshot, :shop_id, :id, :name, :products
end
