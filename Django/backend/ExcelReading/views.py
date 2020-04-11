import json

import xlrd
from django.http import HttpResponse, JsonResponse
# from rest_framework.parsers import JSONParser parse tout ce qui rentre comme étant du json
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets

from .models import Cours, CoursT
from .serializers import CoursSerializer, CoursTSerializer


# from tutorial.quickstart.serializers import UserSerializer


class CoursViewSet(viewsets.ModelViewSet):
    queryset = Cours.objects.all()
    serializer_class = CoursSerializer


@csrf_exempt
def get_schedule(request):
    if request.method == 'GET':
        chaine = request.GET.get('query')
        path = "C:/Users/Amarl/Documents/"
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


@csrf_exempt
def recordCourse(request):
    print(request.body.decode('utf-8'))
    body_request = request.body.decode('utf-8')
    body = json.loads(body_request)
    CoursT.objects.create(
        nom_cours=body["nomCours"], groupe=body["groupe"], quadrimestre=body["quadrimestre"],
        nom_prof=body["nomProf"], heure_debut=body["stringHeureDebut"], heure_fin=body["stringHeureFin"],
        local=body["nomClasse"], jour=body["jour"])
    return HttpResponse()


@csrf_exempt
def DeleteAllCourse(request):
    quadri = request.GET.get('quadri')
    CoursT.objects.filter(quadrimestre=quadri).delete()
    return HttpResponse()


@csrf_exempt
def getScheduleFromDB(request):
    queryLundi = CoursT.objects.all().filter(jour="LUNDI")
    queryMardi = CoursT.objects.all().filter(jour="MARDI")
    queryMercredi = CoursT.objects.all().filter(jour="MERCREDI")
    queryJeudi = CoursT.objects.all().filter(jour="JEUDI")
    queryVendredi = CoursT.objects.all().filter(jour="VENDREDI")
    matrix = [queryLundi, queryMardi, queryMercredi, queryJeudi, queryVendredi]
    doublematrix = [CoursTSerializer(matrix[x], many=True).data for x in range(len(matrix))]
    json.dumps(doublematrix)
    return JsonResponse(doublematrix, safe=False)
