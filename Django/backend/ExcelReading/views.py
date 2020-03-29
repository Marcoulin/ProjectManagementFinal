from django.contrib.auth.models import User, Group
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
# from rest_framework.parsers import JSONParser parse tout ce qui rentre comme étant du json
from django.views.decorators.csrf import csrf_exempt
from .serializers import MovieSerializer
from .models import Movie
import json
import xlrd


# from tutorial.quickstart.serializers import UserSerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


@csrf_exempt
def get_shedule(request):
    if request.method == 'GET':
        chaine = request.GET.get('query')
        path = "C:/Users/Sofian/Desktop/"
        wb = xlrd.open_workbook(path + chaine)
        sheet = wb.sheet_by_index(0)
        matrix = [[sheet.cell_value(y, x) for x in range(sheet.ncols)] for y in range(sheet.nrows)]
        my_json_strin = json.dumps(matrix)
        return HttpResponse(my_json_strin)
