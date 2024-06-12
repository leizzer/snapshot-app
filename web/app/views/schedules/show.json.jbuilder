# frozen_string_literal: true

json.set! :data do
  json.extract! @schedule, :id, :shop_id, :recurring
end
