from rest_framework import serializers

from .models import Movie, CoursT, Cours


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'title', 'desc', 'year')


class CoursTSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoursT
        fields = ('id', 'nom_cours', 'groupe', 'quadrimestre', 'heure_debut', 'nom_prof', 'heure_fin', 'local', 'jour')


class CoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cours
        fields = ('id', 'cours', 'quadrimestre', 'nombre_heure', 'nombre_credit')
