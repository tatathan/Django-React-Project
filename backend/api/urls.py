from django.urls import path
from .views import ProjectViewset, ProjectManagerViewset, EmployeesViewset
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('project', ProjectViewset, basename='project')
router.register('projectmanager', ProjectManagerViewset, basename='projectmanager')
router.register('employees', EmployeesViewset, basename='employees')
urlpatterns = router.urls


# urlpatterns = [
#     path('', views.home),
# ]