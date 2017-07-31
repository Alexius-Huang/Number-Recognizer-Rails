class Sample < ApplicationRecord
  after_create :create_sample_image_file

  class << self
    def train_classifier
      result = `python3.6 ./scripts/train_classifier.py`
    end

    def predict(answer, img_base64)
      result = `python3.6 ./scripts/predict.py #{answer} "#{img_base64}"`
      puts result
      result
    end
  end

  private

  def create_sample_image_file
    result = `python3.6 ./scripts/generate_image.py #{self.id} "#{self.img_base64}"`
    generate_json_data
  end

  def generate_json_data(sample_id = self.id, sample_target = self.target)
    result = `python3.6 ./scripts/generate_data.py #{sample_id} #{sample_target}`
  end
end
