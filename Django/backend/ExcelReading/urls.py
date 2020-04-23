from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers
from rest_framework.authtoken.views import ObtainAuthToken
from backend.ExcelReading import views
from backend.ExcelReading.views import *

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)



urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace="rest-framework")),
    url(r'connect/', ObtainAuthToken.as_view()),
    path(r'Schedule/', get_schedule, name="scheduleGot"),
    path(r'AllCourses/', all_courses, name="scheduleGot"),
    path(r'RecordCourse/', recordCourse, name="scheduleGot"),
    path(r'DeleteAllCourses/', DeleteAllCourse, name="scheduleGot"),
    path(r'GetScheduleFromDB/', getScheduleFromDB, name="scheduleGot"),

]


