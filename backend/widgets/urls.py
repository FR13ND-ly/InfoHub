from django.urls import path, include
from . import views

urlpatterns = [
    path('user/login/', views.login),
    path('user/authorization/<str:token>/', views.getUserAuthorization),
    
    path('articles/all/<int:index>/', views.getArticles),
    path('articles/get-article-to-edit/<str:url>/', views.getArticleToEdit),
    path('articles/drafts/', views.getDrafts),
    path('articles/slider/', views.getSlider),
    path('articles/right-side/', views.getRightSideArticles),
    path('articles/category-articles/<str:tag>/', views.getCategoryArticles),
    path('articles/edit/', views.editArticle),
    path('articles/<str:url>/', views.getArticle),
    
    path('likes/get/', views.getLikes),
    path('likes/interact/', views.addLike),

    path('comments/get/<str:url>', views.getComments),
    path('comments/add/', views.addComment),
    path('comments/remove/<int:id>', views.removeComment),

    path('search/', views.search),

    path('files/<int:index>/', views.getFiles),
    path('files/add/', views.addFile),
    path('files/remove/<int:id>/', views.removeFile),
]