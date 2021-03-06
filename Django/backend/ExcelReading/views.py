import json

import xlrd
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
# from rest_framework.parsers import JSONParser parse tout ce qui rentre comme étant du json
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets

from backend.ExcelReading.serializers import UserSerializer, UeSerializer, UserCourseSerializer
from .models import Cours, CoursT, Ue, UserCourse
from .serializers import CoursSerializer, CoursTSerializer


class CoursViewSet(viewsets.ModelViewSet):
    queryset = Cours.objects.all()
    serializer_class = CoursSerializer


@csrf_exempt
def get_schedule(request):
    if request.method == 'GET':
        chaine = request.GET.get('query')
        path = "C:/Users/remix/OneDrive/Bureau/Dossiers/Horaire"
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
    # print(request.body.decode('utf-8'))
    body_request = request.body.decode('utf-8')
    body = json.loads(body_request)
    #
    print("voici le cours " + body["foreignKey"])
    print(Cours.objects.get(cours=body["foreignKey"]))
    CoursT.objects.create(
        nom_cours=body["nomCours"], groupe=body["groupe"], quadrimestre=body["quadrimestre"],
        nom_prof=body["nomProf"], heure_debut=body["stringHeureDebut"], heure_fin=body["stringHeureFin"],
        local=body["nomClasse"], jour=body["jour"], id_cours=Cours.objects.get(cours=body["foreignKey"])
    )
    return HttpResponse()


@csrf_exempt
def DeleteAllCourse(request):
    quadri = request.GET.get('quadri')
    CoursT.objects.filter(quadrimestre=quadri).delete()
    return HttpResponse()


@csrf_exempt
def getScheduleFromDB(request):
    quadri = request.GET.get('quadri')
    queryLundi = CoursT.objects.all().filter(jour="LUNDI", quadrimestre=quadri)
    queryMardi = CoursT.objects.all().filter(jour="MARDI", quadrimestre=quadri)
    queryMercredi = CoursT.objects.all().filter(jour="MERCREDI", quadrimestre=quadri)
    queryJeudi = CoursT.objects.all().filter(jour="JEUDI", quadrimestre=quadri)
    queryVendredi = CoursT.objects.all().filter(jour="VENDREDI", quadrimestre=quadri)
    matrix = [queryLundi, queryMardi, queryMercredi, queryJeudi, queryVendredi]
    # print(json.dumps(CoursTSerializer(queryLundi, many=True).data))
    # print(json.dumps(CoursTSerializer(queryMardi, many=True).data))
    # print(json.dumps(CoursTSerializer(queryMercredi, many=True).data))
    # print(json.dumps(CoursTSerializer(queryJeudi, many=True).data))
    # print(json.dumps(CoursTSerializer(queryVendredi, many=True).data))
    doublematrix = [CoursTSerializer(matrix[x], many=True).data for x in range(len(matrix))]
    json.dumps(doublematrix)
    print("salut")
    # for x in range(len(doublematrix)):
    #   for y in range(len(doublematrix[x])):
    # print(doublematrix)

    return JsonResponse(doublematrix, safe=False)


@csrf_exempt
def getAllUe(request):
    queryQuadriOne = Ue.objects.all().filter(quadrimestre_ue=1)
    queryQuadriTwo = Ue.objects.all().filter(quadrimestre_ue=2)
    queryQuadriThree = Ue.objects.all().filter(quadrimestre_ue=3)
    queryQuadriFour = Ue.objects.all().filter(quadrimestre_ue=4)
    queryQuadriFive = Ue.objects.all().filter(quadrimestre_ue=5)
    matrix = [queryQuadriOne, queryQuadriTwo, queryQuadriThree, queryQuadriFour, queryQuadriFive]
    doublematrix = [UeSerializer(matrix[x], many=True).data for x in range(len(matrix))]
    json.dumps(doublematrix)
    return JsonResponse(doublematrix, safe=False)


@csrf_exempt
def overLapCheck(request):
    body_request = request.body.decode('utf-8')
    body = json.loads(body_request)
    everythingCourseT = []
    tabOrdonnne = []
    # print(body)
    for x in range(len(body)):
        # print("salttt")
        UeObject = Ue.objects.get(nom_ue=body[x])
        allCourses = Cours.objects.all().filter(id_ue=UeObject)
        everythingCourse = CoursSerializer(allCourses, many=True).data
        # print(len(everythingCourse))
        # print(everythingCourse)
        for y in range(len(everythingCourse)):
            CoursObject = Cours.objects.get(cours=everythingCourse[y]["cours"])
            allCoursesT = CoursT.objects.all().filter(id_cours=CoursObject)
            everythingCourseT = CoursTSerializer(allCoursesT, many=True).data
            # print(everythingCourseT)
            for z in range(len(everythingCourseT)):
                tabOrdonnne.append((everythingCourseT[z]["nom_cours"],
                                    everythingCourseT[z]["heure_debut"],
                                    everythingCourseT[z]["heure_fin"],
                                    everythingCourseT[z]["jour"],
                                    everythingCourseT[z]["quadrimestre"]))
    return JsonResponse(tabOrdonnne, safe=False)


@csrf_exempt
def associateCourseStudent(request):
    body_request = request.body.decode('utf-8')
    body = json.loads(body_request)
    print(body)
    username = body['utilisateur']
    body = body['courss']
    nombreCredit = 0
    UserCourse.objects.filter(nom_etudiant=username).delete()
    for x in range(len(body)):
        UeObject = Ue.objects.get(nom_ue=body[x])
        nombreCredit += UeObject.nombre_credit_ue
        allCourses = Cours.objects.all().filter(id_ue=UeObject)
        everythingCourse = CoursSerializer(allCourses, many=True).data
        for y in range(len(everythingCourse)):
            CoursObject = Cours.objects.get(cours=everythingCourse[y]["cours"])
            UserCourse.objects.create(nom_cours=CoursObject, nom_etudiant=username)

    return JsonResponse(nombreCredit, safe=False)


@csrf_exempt
def gettingStudentList(request):
    username = request.GET.get('userType')
    UeStudentCourse = UserCourse.objects.all().filter(nom_etudiant=username)
    StudentCourss = UserCourseSerializer(UeStudentCourse, many=True).data

    return JsonResponse(StudentCourss, safe=False)


@csrf_exempt
def countingCredit(request):
    username = request.GET.get('userType')
    UeStudentCourse = UserCourse.objects.all().filter(nom_etudiant=username)
    StudentCourss = UserCourseSerializer(UeStudentCourse, many=True).data
    print(len(StudentCourss))
    nombreheure = 0

    for x in range(len(StudentCourss)):
        cours = Cours.objects.get(cours=StudentCourss[x]["nom_cours"])
        nombreheure += cours.nombre_heure
    return JsonResponse(nombreheure, safe=False)


# Authentication
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
