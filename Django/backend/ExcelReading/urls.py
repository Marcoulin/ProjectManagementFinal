from django.urls import path

from backend.ExcelReading.views import *

urlpatterns = [
    path(r'Schedule/', get_schedule, name="scheduleGot"),
    path(r'AllCourses/', all_courses, name="scheduleGot"),
    path(r'RecordCourse/', recordCourse, name="scheduleGot"),
    path(r'DeleteAllCourses/', DeleteAllCourse, name="scheduleGot"),
    path(r'GetScheduleFromDB/', getScheduleFromDB, name="scheduleGot")
]
