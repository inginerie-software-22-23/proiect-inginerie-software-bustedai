import torch
import cv2 as cv
from sort import *

def get_rectangles_from_pandas(results_pandas):
    rectangles = []
    for ind in results_pandas.index:
        pt1 = (int(results_pandas['ymin'][ind]), int(results_pandas['xmin'][ind]))
        pt2 = (int(results_pandas['ymax'][ind]),int(results_pandas['xmax'][ind]))
        rectangles.append((pt1, pt2, results_pandas['class'][ind]))
    
    return rectangles

def crop_rectangles_images(image, rectangles, img_name):
    name = 0
    for rectangle in rectangles:
        cropped_image = image[rectangle[0][0] : rectangle[1][0], rectangle[0][1] : rectangle[1][1]]
        cv.imwrite(f"{img_name}img{name}.jpg", cropped_image)
        name+=1

def image_recognition(model, image, image_name):
    results = model(image)
    rectangles = get_rectangles_from_pandas(results.pandas().xyxy[0])
    crop_rectangles_images(image, rectangles,image_name)

def extract_frames_and_write_from_video(video_name, model):
    video = cv.VideoCapture(video_name)
    success,image = video.read()
    count = 0
    while success:
        image_recognition(model, image, f"{video_name}_{count}")
        success,image = video.read()
        count += 1
# Model

model = torch.hub.load('ultralytics/yolov5', 'yolov5s')
model.cpu()  # CPU
# Configuring the model
model.conf = 0.5
#model.classes = [0]
name_of_video = "Detection\Y2Mate.is - Trapped  One Minute Short Film-nDCt6fUE9-o-360p-1654766858605.mp4"
extract_frames_and_write_from_video(name_of_video, model)