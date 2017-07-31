import os.path as path
import json
import scipy

# Import sklearn library
from sklearn import svm
from sklearn.externals import joblib

# Read from JSON file
data_directory = './samples'
data_file = 'data.json'
with open(path.join(data_directory, data_file)) as data_file:
  data = json.load(data_file)

# Destructuring JSON data
targets = []
json_array = []
for sample in data:
  targets.append(sample['target'])
  json_array.append(sample['data'])

# Everytime fitting, it will override previous data
# So the classifier must be trained by the whole data
classifier = svm.SVC(gamma = 0.001)
classifier.fit(json_array, targets)
classifier_dir = './samples'
classifier_file = 'classifier.pkl'
joblib.dump(classifier, path.join(classifier_dir, classifier_file))
