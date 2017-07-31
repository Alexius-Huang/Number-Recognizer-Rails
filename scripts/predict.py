import sys
import os.path as path
import json
import base64

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import helpers.image_processing as imgps
from PIL import Image

from sklearn import svm
from sklearn.externals import joblib

target_answer = sys.argv[1]
imgData = sys.argv[2]
predicted = {}

if imgData and imgData.startswith("data:image/jpeg;base64,"):
  imgData = imgData[len("data:image/jpeg;base64,"):]

  # Transform Image to Grayscale 16 * 16 Image Array
  gray = imgps.base64_to_grayscale(imgData)
  c_img = imgps.calibrate_image_array(gray)
  img = Image.fromarray(c_img).resize((16, 16), Image.ANTIALIAS)
  img_arr = np.array(img)
  inv_arr = imgps.image_grayscale_invert(img_arr)
  data_arr = imgps.one_dimensionalize(inv_arr)

  for index, grayscale in enumerate(data_arr):
    data_arr[index] = int(np.round(grayscale / 16))

  classifier_dir = './samples'
  classifier_file = path.join(classifier_dir, 'classifier.pkl')
  classifier = joblib.load(classifier_file)
  predicted = classifier.predict([data_arr])[0]
  print(predicted)
