import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import numpy as np
import os.path as path
from PIL import Image

LEVEL = [8, 16, 32, 64, 128]

# Change RGB image array to Gray Scale
def rgb2gray(rgb):
  return np.dot(rgb[...,:3], [0.299, 0.587, 0.114])

# Convert two dimensional array into one dimension numpy array
def one_dimensionalize(two_dimensional_array):
  # Get the shape of the array
  size = np.shape(two_dimensional_array)
  height = size[0]
  width  = size[1]

  # Parsing into new array
  result = []
  for y in range(0, height):
    for x in range(0, width):
      result.append(two_dimensional_array[y][x])

  return np.array(result)

# Calibrate the image in order to let the gravity of mass of the number centered
def calibrate_image_array(numpy_grayscale_array):
  gray = numpy_grayscale_array

  # The size is defined in panel.js
  width = height = 300
  size = height * width

  mass_of_x = mass_of_y = recorded_dots = 0
  centroid_x = centroid_y = 0

  # Calculate the mass of the x, y coordination
  for y in range(0, height):
    for x in range(0, width):
      if gray[y][x] < 128:
        mass_of_x += x
        mass_of_y += y
        recorded_dots += 1

  # Get the centroid of the number image
  centroid_x = mass_of_x / recorded_dots
  centroid_y = mass_of_y / recorded_dots

  # Get the distance from center to centroid
  delta_x = int(round( width / 2 - centroid_x))
  delta_y = int(round(height / 2 - centroid_y))

  # Displace the horizontal direction
  if delta_x > 0:
    # Move Right
    for y in range(0, height):
      for x in range(width - 1, delta_x - 1, -1):
        gray[y][x] = gray[y][x - delta_x]
      for x in range(0, delta_x):
        gray[y][x] = 255
  elif delta_x < 0:
    # Move Left
    for y in range(0, height):
      for x in range(0, width + delta_x):
        gray[y][x] = gray[y][x - delta_x]
      for x in range(width + delta_x, width):
        gray[y][x] = 255

  # Displace the vertical direction
  if delta_y > 0:
    # Move Down
    for x in range(0, width):
      for y in range(height - 1, delta_y - 1, -1):
        gray[y][x] = gray[y - delta_y][x]
      for y in range(0, delta_y):
        gray[y][x] = 255
  elif delta_y < 0:
    # Move Up
    for x in range(0, width):
      for y in range(0, height + delta_y):
        gray[y][x] = gray[y - delta_y][x]
      for y in range(height + delta_y, height):
        gray[y][x] = 255

  return gray

# Saving the image
def save_image(data, cmap, filename):
    # Get the size of the image
    sizes = np.shape(data)
    height = float(sizes[0])
    width = float(sizes[1])
     
    # Plotting the image
    fig = plt.figure()
    fig.set_size_inches(width / height, 1, forward = False)
    ax = plt.Axes(fig, [0., 0., 1., 1.])
    ax.set_axis_off()
    fig.add_axes(ax)
 
    # Saving the image
    ax.imshow(data, cmap = cmap)
    plt.savefig(filename, dpi = height)
    plt.close()

# Read the image and read the grayscaled numpy array
# Input should be the gray scaled image
def imread_grayscale(img_dir):
  img = mpimg.imread(img_dir)
  img_arr = []
  size = np.shape(img)
  height = size[0]
  width  = size[1]

  for y in range(0, height):
    img_arr.append([])
    for x in range(0, width):
      img_arr[y].append(img[y][x][0])

  return np.array(img_arr)

# Invert the grayscaled array
def image_grayscale_invert(img_grayscale_array):
  # Get the size of the grayscale image
  size = np.shape(img_grayscale_array)
  height = size[0]
  width  = size[1]

  # Generate inverted grayscale array
  inverted_gray = []
  for y in range(0, height):
    inverted_gray.append([])
    for x in range(0, width):
      inverted_gray[y].append(255 - img_grayscale_array[y][x])

  return np.array(inverted_gray)

# Generate processed image in different level of resolution and save each image in corresponding directory
def generate_processed_image(img_dir, filename):
  # With Resolution Level for now not being implemented
  # for resolution_level, resolution in enumerate(LEVEL):
  #   save_directory = './data/processed/level_%i' % (resolution_level + 1)
  #   save_filename = path.join(save_directory, filename)

  #   img = Image.open(img_dir)
  #   img = img.resize((resolution, resolution), Image.ANTIALIAS)
  #   img.save(save_filename)
  save_directory = './samples/processed'
  save_filename = path.join(save_directory, filename)

  img = Image.open(img_dir)
  img = img.resize((16, 16), Image.ANTIALIAS)
  img.save(save_filename)
