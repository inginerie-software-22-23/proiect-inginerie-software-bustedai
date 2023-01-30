import torch
import cv2 as cv
import numpy as np
from sort.sort import *
import sys
import os
import zipfile
import shutil

def get_rectangles_from_pandas(results_pandas):
    rectangles = []
    for ind in results_pandas.index:
        pt1 = (int(results_pandas['ymin'][ind]), int(results_pandas['xmin'][ind]))
        pt2 = (int(results_pandas['ymax'][ind]),int(results_pandas['xmax'][ind]))
        if results_pandas['class'][ind] == 0:
            rectangles.append([pt1[0], pt2[0], pt1[1], pt2[1], results_pandas['confidence'][ind]])
    
    return np.array(rectangles)

def crop_rectangles_images(image, rectangles, img_name, used_indexes):
    global output_folder, name_of_video
    video_name_without_extension = "output_video" #get_video_name(name_of_video)
    output_folder_name = f"Output"
    name = 0
    for rectangle in rectangles:
        #check if the id was already used
        if used_indexes.get(int(rectangle[4])) == None:
            used_indexes[int(rectangle[4])] = True
            cropped_image = image[int(rectangle[0]) : int(rectangle[1]), int(rectangle[2]) : int(rectangle[3])]
            cv.imwrite(f"{output_folder_name}\\{video_name_without_extension}{int(rectangle[4])}_{name}.jpg", cropped_image)
            name+=1

def image_recognition(model, image, image_name, mot_tracker, used_indexes):
    results = model(image)
    rectangles = get_rectangles_from_pandas(results.pandas().xyxy[0])
    if len(rectangles) > 0:
        rectangles = mot_tracker.update(rectangles)
        crop_rectangles_images(image, rectangles,image_name, used_indexes)

def extract_frames_and_write_from_video(video_name, model):
    video = cv.VideoCapture(video_name)
    success,image = video.read()
    count = 0
    mot_tracker = Sort()
    used_indexes = dict()
    while success:
        image_recognition(model, image, f"{video_name}_{count}", mot_tracker, used_indexes)
        success,image = video.read()
        count += 1

    video.release()

def get_video_name(video_name):
    path_video = video_name.split("\\")
    video_name = path_video[len(path_video) - 1].split('.')[0]
    return video_name

#def create_folder_for_video_output(user_folder_name, video_name):
#    video_name = get_video_name(video_name)
#    os.mkdir(f"{user_folder_name}\\{video_name}")
#
#def create_user_folder_if_not_existing(output_folder_name, video_name):
#    folder_path = f"Output\\{output_folder_name}"
#    all_file = None
#    file = None
#    if os.path.exists(folder_path) == False:
#        os.mkdir(folder_path)
#        file = open(f"{folder_path}\\all_analyzed.txt", 'w+')
#    else:
#        if os.path.exists(f"{folder_path}\\all_analyzed.txt") == True:
#            file = open(f"{folder_path}\\all_analyzed.txt", 'r+')
#            all_file = file.read()
#        else:
#            file = open(f"{folder_path}\\all_analyzed.txt", 'w+')
#    
#    file.close()
#
#    if all_file != None and video_name in all_file:
#        return None
#
#    file = open(f"{folder_path}\\all_analyzed.txt", 'a')
#    file.write("\n" + video_name)
#    file.close()
#    create_folder_for_video_output(folder_path, video_name) 
#    return True

def get_system_arguments():
    name_of_video = sys.argv[1]
    return name_of_video

def check_or_create_folder_output():
    if os.path.isdir("Output"):
        shutil.rmtree("Output")

    os.mkdir("Output")

def make_zip_file():

    if len(os.listdir("Output")) == 0:
        file = open(f"Output\\fisier.txt", 'w')
        file.write("Hello")
        file.close()

    with zipfile.ZipFile("Output.zip","w") as myzip:
        for image_name in os.listdir("Output"):
            myzip.write(f"Output\\{image_name}")

def rename_video_file(old_video_path):
    video_path_new = old_video_path.split(".")[0]
    video_path_new = video_path_new + ".mp4"
    
    if os.path.exists(video_path_new):
        os.remove(video_path_new)

    if os.path.exists(old_video_path):
        os.rename(old_video_path, video_path_new)
        return video_path_new
    
    return None

if __name__ == "__main__":
    # Model
    model = torch.hub.load('ultralytics/yolov5', 'yolov5m')

    # Configuring the model
    name_of_video = get_system_arguments()
    name_of_video = rename_video_file(name_of_video)

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu") #passing the model to cpu or gpu

    check_or_create_folder_output()
    
    if name_of_video == None:
        make_zip_file()
        file = open("Output\\text.txt", 'w')
        file.write("Nu s-a furnizat numele fisierului")
        file.close()

    model.conf = 0.75
    model.classes = [0]
    output_folder = ""

    extract_frames_and_write_from_video(name_of_video, model)

    make_zip_file()
