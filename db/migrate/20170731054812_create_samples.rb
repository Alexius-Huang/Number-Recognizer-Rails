class CreateSamples < ActiveRecord::Migration[5.1]
  def change
    create_table :samples do |t|
      t.integer :target
      t.text :img_base64

      t.timestamps
    end
  end
end
