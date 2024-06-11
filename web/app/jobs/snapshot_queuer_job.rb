class SnapshotQueuerJob < ApplicationJob
  queue_as :default

  def perform(schedule_type:)
    shops = Shop.joins(:schedule, :snapshots)
      .where(schedules: { recurring: schedule_type })
      .not.where(snapshots: {
        automatic: true,
        created_at: Time.now.send("beginning_of_#{schedule_type}")..Time.now
      })

    shops.in_batches(of: 10) do |shop, index|
      SnapshotJob.set(set_wait: (index + 5).minutes)
        .perform_later(shop_id: shop.id)
    end
  end
end
