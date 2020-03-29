from django.urls import path

from backend.ExcelReading.views import *

urlpatterns = [
    path(r'schedule/', get_schedule, name="scheduleGot"),
    path(r'AllCourses/', all_courses, name="scheduleGot"),
    path(r'SaveCourses/', saveCourse, name="scheduleGot")
]
