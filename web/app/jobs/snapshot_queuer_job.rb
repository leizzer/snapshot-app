class SnapshotQueuerJob < ApplicationJob
  queue_as :default

  SCHEDULES = {
    "daily" => 'day',
    "weekly" => 'week',
    "monthly" => 'month'
  }.freeze

  def perform(schedule_type)
    @schedule_type = schedule_type

    shops_without_snapshots.in_batches(of: 10) do |batch|
      batch.each do |shop|
        SnapshotJob.perform_later(shop_id: shop.id)
      end
    end
  end

  private

  def shops_relation
    Shop.distinct.joins(:snapshots, :schedule)
      .where(schedules: { recurring: @schedule_type })
  end

  def shops_without_snapshots
    shops_relation.where(
      "NOT EXISTS ("\
      "SELECT 1"\
      " FROM snapshots"\
      " WHERE snapshots.shop_id = shops.id"\
      "  AND snapshots.automatic = true"\
      "  AND snapshots.created_at BETWEEN :beginning_date AND :end_date"\
      ")",
      beginning_date: beginning_date,
      end_date: Time.now
    )
  end

  def beginning_date
    schedule = SCHEDULES[@schedule_type]
    Time.now.send("beginning_of_#{schedule}")
  end

end
