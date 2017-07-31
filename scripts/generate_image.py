# from sklearn import svm
# from sklearn.externals import joblib

import sys
import os.path as path
import base64
# import numpy as np
# import matplotlib.pyplot as plt
# import matplotlib.image as mpimg
# import json

import helpers.image_processing as imgps

imgID = sys.argv[1].zfill(6)
imgData = sys.argv[2]
# serial = ImageSample.objects.count() + 1
# imgID = str(serial).zfill(6)

# The level counts and the maximum level
# MAX_LEVEL = 5

SAMPLE_DIR = './samples/raw'
CALIBRATE_DIR = './samples/calibrated/'
# PROCESS_DIR = './data/processed/'
# CLASSIFIER_DIR = './data/classifier/'
# LEVEL_ARR = [ 2 ** (2 + i) for i in range(1, MAX_LEVEL + 1) ]

filename = path.join(SAMPLE_DIR, "sample%s.jpg" % imgID)
if imgData and imgData.startswith("data:image/jpeg;base64,"):
  imgData = imgData[len("data:image/jpeg;base64,"):]
  with open(filename, "wb") as fh:
    fh.write(base64.b64decode(imgData))

  # Calibrate sample and save it
  c_filename = path.join(CALIBRATE_DIR, "sample%s.jpg" % imgID)
  gray = imgps.imread_grayscale(filename)
  c_img = imgps.calibrate_image_array(gray)
  imgps.save_image(c_img, 'gray', c_filename)

  # Processing the Image
  imgps.generate_processed_image(c_filename, "sample%s.jpg" % imgID)
