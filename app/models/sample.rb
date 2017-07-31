class Sample < ApplicationRecord
  after_create :create_sample_image_file

  private

  def create_sample_image_file
    result = `python3.6 ./scripts/generate_image.py #{self.id} "#{self.img_base64}"`
    generate_json_data
  end

  def generate_json_data(sample_id = self.id, sample_target = self.target)
    result = `python3.6 ./scripts/generate_data.py #{sample_id} #{sample_target}`
    puts result
  end
end
