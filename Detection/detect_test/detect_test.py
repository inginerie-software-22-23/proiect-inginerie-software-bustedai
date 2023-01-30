import sys
sys.path.append("..")

from detect import *
import os
import unittest
import pandas as pd
import cv2 as cv

class TestStringMethods(unittest.TestCase):
    
    def test_rename_video_file_test_positive_example(self):
        name_of_video = "D:\proiect_is\proiect-inginerie-software-bustedai\Detection\detect_test\\tmpD300.tmp"
        new_video_path = rename_video_file(name_of_video)

        name_of_mp4 = "D:\proiect_is\proiect-inginerie-software-bustedai\Detection\detect_test\\tmpD300.mp4"
        self.assertEqual(os.path.exists(name_of_mp4), True, f"Nu exista calea {name_of_mp4}")
        self.assertEqual(new_video_path, name_of_mp4, f"Nu sunt egale {new_video_path}, {name_of_mp4}")

        os.rename(name_of_mp4, name_of_video)

    def test_rename_video_file_test_false_example(self):
        name_of_video = "D:\proiect_is\proiect-inginerie-software-bustedai\Detection\detect_test\\tmpD301.tmp"
        name_of_renamed_file = rename_video_file(name_of_video)

        name_of_mp4 = "D:\proiect_is\proiect-inginerie-software-bustedai\Detection\detect_test\\tmpD301.mp4"
        self.assertFalse(os.path.exists(name_of_mp4))
        self.assertEqual(name_of_renamed_file, None)

    def test_get_rectangles_pandas_frame_positive_example(self):
        file_with_rectangles = pd.read_csv("fisier_rectangle.csv")
        rectangles = get_rectangles_from_pandas(file_with_rectangles)

        rectangle1 = np.array([14, 15, 12, 13, 0.62])
        rectangle2 = np.array([18, 19, 16, 17, 0.76])
        
        self.assertTrue(np.all(rectangle1 == rectangles[0]))
        self.assertTrue(np.all(rectangle2 == rectangles[1]))

    def test_get_rectangles_pandas_frame_false_example(self):
        file_with_rectangles = pd.read_csv("fisier_rectangle.csv")
        rectangles = get_rectangles_from_pandas(file_with_rectangles)

        rectangle1 = np.array([100, 50, 20, 50, 0.43])
        rectangle2 = np.array([20, 50, 30, 70, 0.90])
        
        self.assertFalse(np.all(rectangle1 == rectangles[0]))
        self.assertFalse(np.all(rectangle2 == rectangles[1]))

    def test_cropped_images_from_image(self):
        image = cv.imread("img_test.jpg")
        file_with_rectangles = pd.read_csv("fisier_rectangle.csv")
        rectangles = get_rectangles_from_pandas(file_with_rectangles)
        used_index = dict()

        rectangles[0][4] = 1 #assigning value 

        print(len(rectangles))
        self.assertEqual(len(rectangles), 2)
        crop_rectangles_images(image, rectangles, "", used_index)
        
        self.assertEqual(len(os.listdir("Output")), 1)


if __name__ == '__main__':
    unittest.main()