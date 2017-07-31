import sys
import os.path as path
import json
import numpy as np
import helpers.image_processing as imgps

sampleID = sys.argv[1].zfill(6)
target = sys.argv[2]

PROCESS_DIR = './samples/processed'
filename = 'sample%s.jpg' % sampleID

# Parsing the processed sample file as an array og json daya
img_dir = path.join(PROCESS_DIR, filename)
gray = imgps.imread_grayscale(img_dir)
inv_gray = imgps.image_grayscale_invert(gray)
data_arr = imgps.one_dimensionalize(inv_gray)

data = dict()

for index, grayscale in enumerate(data_arr):
  data_arr[index] = int(np.round(grayscale / 16))

# Dump json to the file
json_record_file = './samples/data.json'
with open(json_record_file, 'r+') as outfile:
  json_data = json.load(outfile)
  data['data'] = data_arr.tolist()
  data['target'] = target
  json_data.append(data)
  outfile.seek(0)
  outfile.truncate()
  json.dump(json_data, outfile)
