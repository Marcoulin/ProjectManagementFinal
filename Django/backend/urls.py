from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from backend.ExcelReading import views

router = routers.DefaultRouter()
router.register(r'AllCoursez', views.CoursViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('', include('backend.ExcelReading.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
