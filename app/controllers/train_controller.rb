class TrainController < ApplicationController
  skip_before_action :verify_authenticity_token, only: %i[feed]
  def index
  end

  def feed
    Sample.create(sample_params)
    respond_to do |format|
      format.json { render json: { status: 'OK', code: 200 } }
    end
  end

  private

  def sample_params
    { img_base64: params['imgURL'], target: params['target'] }
  end
end
