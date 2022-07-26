from django.urls import path, include
from . import views

urlpatterns = [
    path('add/', views.addFile),
    path('remove/<int:id>/', views.removeFile),
    path('<int:index>/', views.getFiles),
]