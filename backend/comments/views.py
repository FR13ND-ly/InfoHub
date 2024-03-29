from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from .models import Comment
from profiles.models import Profile
from articles.models import Article
from files.views import getFile
from rest_framework import status
from articles.views import formatDate

def getComments(request, url):
    comments = []
    for comment in Comment.objects.filter(article=url).order_by("-date"):
        if Profile.objects.filter(token=comment.author).exists():
            author = Profile.objects.get(token=comment.author)
            comments.append({
                "id": comment.pk,
                "text": comment.text,
                "username": author.user.first_name,
                "byStaff": author.user.is_staff,
                "date": formatDate(comment.date),
                "photoUrl" : getFile(author.image, "users/"),
                "restrictComments" : Article.objects.get(url=url).restrictComments
            })
        else:
            comment.delete()
    return JsonResponse(comments, status=status.HTTP_200_OK, safe=False)

@csrf_exempt
def addComment(request):
    data = JSONParser().parse(request)
    Comment.objects.create(
        author=data['author'],
        text=data['text'],
        article=data['article']
    ).save()
    return JsonResponse({}, status=status.HTTP_201_CREATED)


@csrf_exempt
def removeComment(request, id):
    Comment.objects.get(id=id).delete()
    return JsonResponse({}, status=status.HTTP_200_OK)