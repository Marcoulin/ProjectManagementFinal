from django.contrib import admin

from .models import CoursT, Cours, Ue, User

admin.site.register(CoursT)
admin.site.register(User)
admin.site.register(Cours)
admin.site.register(Ue)
