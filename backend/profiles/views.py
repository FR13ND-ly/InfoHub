from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.contrib.auth.models import User
from .models import Profile
from files.views import addUserPhoto, getFile, uploadFile
from rest_framework import status


@csrf_exempt
def login(request):
    data = JSONParser().parse(request)
    user, created = User.objects.get_or_create(
        first_name=data['displayName'],
        email=data['email']
    )
    if (created):
        user.username = data['uid']
        user.save()
    profile, created = Profile.objects.get_or_create(
        token = data['uid'],
        user = user
    )
    if (created):
        profile.image = addUserPhoto(data['photoURL'], data['uid'])
        profile.save()
    response = {
        "imageUrl" : getFile(profile.image, "users/"),
        "isStaff" : user.is_staff,
        "allowWriteComments" : profile.allowWriteComments,
        "allowChangeAvatar" : profile.allowChangeAvatar
    }
    return JsonResponse(response, status = status.HTTP_200_OK)

def getUserAuthorization(request, token):
    profile = Profile.objects.get(token = token)
    response = {
        "imageUrl" : getFile(profile.image, "users/"),
        "isStaff" : profile.user.is_staff,
        "allowWriteComments" : profile.allowWriteComments,
        "allowChangeAvatar" : profile.allowChangeAvatar
    }
    return JsonResponse(response, status = status.HTTP_200_OK)

@csrf_exempt
def setUserImage(request, token):
    profile = Profile.objects.get(token = token)
    profile.image = uploadFile(request, token, "/users/", hidden = True)
    profile.save()
    return JsonResponse({}, status = status.HTTP_200_OK)


