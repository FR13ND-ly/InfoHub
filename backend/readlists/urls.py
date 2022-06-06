from django.urls import path, include
from . import views

urlpatterns = [
    path('get/all/<str:token>/', views.getLists),
    path('get-light/', views.getLightLists),
    path('add-view/', views.addView),
    path('info/<str:pk>/', views.getListInfo),
    path('articles/<str:pk>/', views.getListInfo),
    path('add-to-list/', views.addToList),
    path('add/', views.addList),
    path('info/<str:pk>/', views.editList),
    path('delete/<str:pk>/', views.deleteList),
]