from django.db import models


class User(models.Model):
    nom_user = models.CharField(max_length=200, unique=False)
    level = models.IntegerField(null=False)
    Nombre_credit = models.IntegerField(null=False)
    adresse = models.CharField(max_length=200, null=False)
    annee = models.IntegerField(null=False)


class Ue(models.Model):
    nom_ue = models.CharField(max_length=200, unique=True)
    quadrimestre_ue = models.IntegerField(null=False)
    nombre_credit_ue = models.IntegerField(null=False)
    nombre_heure_ue = models.IntegerField(null=False)
    id_users = models.ManyToManyField(User, related_name='User', blank=True, default=1)


class Cours(models.Model):
    cours = models.CharField(max_length=200, unique=True)
    quadrimestre = models.IntegerField(null=False)
    nombre_heure = models.IntegerField(null=False)
    id_ue = models.ForeignKey(Ue, on_delete=models.CASCADE, null=True)


class CoursT(models.Model):
    nom_cours = models.CharField(max_length=200, unique=False)
    groupe = models.IntegerField(null=True)
    quadrimestre = models.IntegerField(null=False)
    nom_prof = models.CharField(max_length=200)
    heure_debut = models.CharField(max_length=200)
    heure_fin = models.CharField(max_length=200)
    local = models.CharField(max_length=200)
    jour = models.CharField(max_length=200, null=True)
    id_cours = models.ForeignKey(Cours, on_delete=models.CASCADE, null=True)

# def __str__(self):
#  return self.nom_cours
#  ForeignkeyOneToMany = models.ForeignKey(Movie, on_delete=models.CASCADE)
# ForeignkeyOneToOne = models.OneToOneField(Movie)
# ForeignkeyManyToMany = models.ManyToManyField(Movie, related_name='Movie', blank=True)
