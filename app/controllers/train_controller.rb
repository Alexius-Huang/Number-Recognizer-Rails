class TrainController < ApplicationController
  skip_before_action :verify_authenticity_token, except: %i(index)

  def index
  end

  def feed
    Sample.create(sample_params)
    respond_to do |format|
      format.json { render json: { status: 'OK', code: 200 } }
    end
  end

  def train_classifier
    Sample.train_classifier
    respond_to do |format|
      format.json { render json: { status: 'OK', code: 200 } }
    end
  end

  def predict
    result = Sample.predict(params['answer'], params['img_base64'])
    respond_to do |format|
      format.json { render json: { status: 'OK', code: 200, result: result } }
    end
  end

  private

  def sample_params
    { img_base64: params['imgURL'], target: params['target'] }
  end
end
