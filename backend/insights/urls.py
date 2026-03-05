from django.urls import path
from .views import insights_api

urlpatterns = [
    path("insights/", insights_api),
]