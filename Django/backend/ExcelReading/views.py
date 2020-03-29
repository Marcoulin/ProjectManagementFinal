import json

import xlrd
from django.http import HttpResponse, JsonResponse
# from rest_framework.parsers import JSONParser parse tout ce qui rentre comme étant du json
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets

from .models import Movie, Cours
from .serializers import MovieSerializer, CoursSerializer


# from tutorial.quickstart.serializers import UserSerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class CoursViewSet(viewsets.ModelViewSet):
    queryset = Cours.objects.all()
    serializer_class = CoursSerializer


@csrf_exempt
def get_schedule(request):
    if request.method == 'GET':
        chaine = request.GET.get('query')
        path = "C:/Users/Sofian/Desktop/"
        wb = xlrd.open_workbook(path + chaine)
        sheet = wb.sheet_by_index(0)
        matrix = [[sheet.cell_value(y, x) for x in range(sheet.ncols)] for y in range(sheet.nrows)]
        my_json_strin = json.dumps(matrix)
        return HttpResponse(my_json_strin)


def all_courses(request):
    quadri = int(request.GET.get('query'))
    query = Cours.objects.all().filter(quadrimestre=quadri)
    serializer = CoursSerializer(query, many=True)
    return JsonResponse(serializer.data, safe=False)


def saveCourse(request):
    matrix = request.POST.get('query')
    return JsonResponse({'content': 'les données ont bien été ajouté'})
