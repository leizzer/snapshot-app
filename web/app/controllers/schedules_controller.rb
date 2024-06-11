# frozen_string_literal: true

class SchedulesController < AuthenticatedController
  # GET /schedules/:id
  def show
    @schedule = current_shop.schedule
  end

  # POST /schedules
  def create
    @schedule = current_shop.build_schedule(schedule_params)
    @schedule.save!

    render json: @schedule
  end

  # PUT /schedules/:id
  def update
    @schedule = current_shop.schedule
    @schedule.update!(schedule_params)

    render json: @schedule
  end

  # DELETE /schedules/:id
  def destroy
    @schedule = current_shop.schedule
    @schedule.destroy!

    head :no_content
  end

  private

  def schedule_params
    params.require(:data).permit(:recurring)
  end

end
