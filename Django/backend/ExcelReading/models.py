from django.db import models


class Movie(models.Model):
    title = models.CharField(max_length=32)
    desc = models.CharField(max_length=256)
    year = models.IntegerField()


class CoursT(models.Model):
    nom_cours = models.CharField(max_length=200, unique=True)
    groupe = models.IntegerField(null=True)
    quadrimestre = models.IntegerField(null=False)
    nom_prof = models.CharField(max_length=200)
    heure_debut = models.CharField(max_length=200)
    heure_fin = models.CharField(max_length=200)
    local = models.CharField(max_length=200)


class Cours(models.Model):
    cours = models.CharField(max_length=200, unique=True)
    quadrimestre = models.IntegerField(null=False)
    nombre_credit = models.IntegerField(null=False)
    nombre_heure = models.IntegerField(null=False)

# def __str__(self):
#  return self.nom_cours
#  ForeignkeyOneToMany = models.ForeignKey(Movie, on_delete=models.CASCADE)
# ForeignkeyOneToOne = models.OneToOneField(Movie)
# ForeignkeyManyToMany = models.ManyToManyField(Movie, related_name='Movie', blank=True)
