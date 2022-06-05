from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from .models import Comment

apiUrl = "http://infohub.pythonanywhere.com/api"

def getComments(request, url):
    comments = []
    for comment in Comment.objects.filter(article=url).order_by("-date"):
        author = Profile.objects.get(token=comment.author).user
        comments.append({
            "id": comment.pk,
            "text": comment.text,
            "username": author.username,
            "byStaff": author.is_staff,
            "date": formatDate(comment.date),
            "photoUrl" : comment.photoUrl
        })
    return JsonResponse(comments, safe=False)

@csrf_exempt
def addComment(request):
    data = JSONParser().parse(request)
    Comment.objects.create(
        author=data['author'],
        text=data['text'],
        article=data['article'],
        photoUrl=data['photoUrl']
    ).save()
    return JsonResponse("ok", safe=False)


@csrf_exempt
def removeComment(request, id):
    Comment.objects.get(id=id).delete()
    return JsonResponse("ok", safe=False)