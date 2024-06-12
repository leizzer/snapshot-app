require "sidekiq-scheduler"

# Disable Sidekiq Scheduler in development
# SidekiqScheduler::Scheduler.instance.enabled = !Rails.env.development?
