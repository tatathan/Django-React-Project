from rest_framework import serializers
from .models import Project, ProjectManager, Employees

class ProjectManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectManager
        fields = ("id", "name")

class EmployeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = ("id", "name")

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ("id", "name", "project_manager", "employees", "start_date", "end_date", "comments", "status")
