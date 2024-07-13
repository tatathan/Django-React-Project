from django.contrib import admin
from .models import Project, ProjectManager, Employees

admin.site.register(Project)
admin.site.register(ProjectManager)
admin.site.register(Employees)


