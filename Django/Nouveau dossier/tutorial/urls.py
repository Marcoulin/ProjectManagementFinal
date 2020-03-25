from django.contrib import admin
from django.urls import path
from django.urls import include, path
from rest_framework import routers
from tutorial.quickstart import views
from tutorial.quickstart.views import *

# router = routers.DefaultRouter()
# router.register(r'movies', views.MovieViewSet)

# router2 = routers.DefaultRouter()
# router2.register(r'coucou', views.MovieViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', include(router.urls)),
    path(r'shedule/', get_shedule),
    # path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
