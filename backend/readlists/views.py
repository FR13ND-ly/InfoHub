from django.shortcuts import render
from .models import List, ListItem
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def getLightLists(request):
    data = JSONParser().parse(request)
    response = []
    for ulist in List.objects.filter(user=data['token']):
        response.append({
            "pk": ulist.pk,
            "name": ulist.name,
            "public": ulist.public,
            "added": bool(ListItem.objects.filter(article=data['id'], List=ulist.pk))
        })
    return JsonResponse(response, safe=False)

@csrf_exempt
def addToList(request):
    data = JSONParser().parse(request)
    nlist, created = ListItem.objects.get_or_create(
        List=data['pk'],
        article=data['id']
    )
    if (created):
        nlist.save()
    else:
        nlist.delete()
    return JsonResponse("ok", safe=False)

@csrf_exempt
def getLists(request, pk):
    response = []
    historic_raw = View.objects.filter(user=pk).order_by('date')
    history = {
        "id": 'istoric',
        "name": "Istoric",
        "lastPreview": "",
        "preview": [],
        "length": historic_raw.count()
    }
    if len(historic_raw):
        for historic in historic_raw[0: 3]:
            if (not len(Article.objects.filter(id=historic.article))):
                Article.objects.filter(id=historic.article).delete()
            article = Article.objects.filter(id=historic.article)[0]
            history['preview'].append({
                "title": article.title,
                "url": article.url,
                "cover": apiUrl + File.objects.get(id=article.cover).file.url
            })
            history['lastPreview'] = apiUrl + \
                File.objects.get(id=article.cover).file.url
    response.append(history)
    likes_raw = Like.objects.filter(user=pk).order_by('-date')
    likes = {
        "id": 'aprecieri',
        "name": "Apreciate",
        "lastPreview": "",
        "preview": [],
        "length": likes_raw.count()
    }
    if len(likes_raw):
        for like in likes_raw[0: 3]:
            article = Article.objects.filter(id=like.article)[0]
            likes['preview'].append({
                "title": article.title,
                "url": article.url,
                "cover": apiUrl + File.objects.get(id=article.cover).file.url
            })
            likes['lastPreview'] = apiUrl + \
                File.objects.get(id=article.cover).file.url
    response.append(likes)
    for tlist in List.objects.filter(user=pk).order_by('date'):
        rlist_raw = ListItem.objects.filter(List=tlist.id)
        rlist = {
            "id": tlist.id,
            "name": tlist.name,
            "lastPreview": "",
            "preview": [],
            "length": rlist_raw.count()
        }
        if len(rlist_raw):
            for listItem in rlist_raw[0: 3]:
                article = Article.objects.get(id=listItem.article)
                rlist['preview'].append({
                    "title": article.title,
                    "url": article.url,
                    "cover": apiUrl + File.objects.get(id=article.cover).file.url
                })
                rlist['lastPreview'] = apiUrl + \
                    File.objects.get(id=article.cover).file.url
        response.append(rlist)
    return JsonResponse(response, safe=False)


@csrf_exempt
def getListInfo(request):
    data = JSONParser().parse(request)
    if (not List.objects.filter(id=data['id']).count() and data['id'] != -1 and data['id'] != -2):
        return JsonResponse("Nu am găsit această listă", safe=False)
    user = Profile.objects.get(token=data['token'])
    response = {
        "name": '',
        "author": user.user.username,
        "public": False,
        "own": True,
        "size": 0
    }
    articles_raw = []
    if data['id'] == -1:
        response['size'] = len(View.objects.filter(user=data['token']))
        response['name'] = "Istoric"
    elif data['id'] == -2:
        response['size'] = len(Like.objects.filter(user=data['token']))
        response['name'] = "Aprecieri"
    else:
        nList = List.objects.get(id=data['id'])
        response['size'] = len(ListItem.objects.filter(List=data['id']))
        response['name'] = nList.name
        response['public'] = not nList.public
        response['own'] = nList.user == user.token
        if (not response['own']):
            response['author'] = Profile.objects.get(
                token=nList.user).user.username
    return JsonResponse(response, safe=False)


@csrf_exempt
def getListArticles(request):
    data = JSONParser().parse(request)
    response = {
        "articles": [],
        "noMoreArticles": True,
    }
    articles_raw = []
    if data['id'] == -1:
        articles_raw = View.objects.filter(user=data['token']).order_by("-date")
    elif data['id'] == -2:
        articles_raw = Like.objects.filter(user=data['token']).order_by("-date")
    else:
        articles_raw = ListItem.objects.filter(List=data['id'])
    response["noMoreArticles"] = (
        len(articles_raw) - 30 * (data["index"] - 1)) < 30
    for article_raw in articles_raw[30 * (data["index"] - 1): 30 * data["index"]]:
        if (int(data['id']) > 0):
            if (not Article.objects.filter(id=article_raw.id)):
                article_raw.delete()
                continue
            article = Article.objects.get(id=article_raw.id)
        else:
            if (not Article.objects.filter(id=article_raw.article)):
                article_raw.delete()
                continue
            article = Article.objects.get(id=article_raw.article)
        response['articles'].append({
            "url": article.url,
            "title": article.title,
            "text": article.text,
            "date": formatDate(article.date),
            "cover": apiUrl + File.objects.get(id=article.cover).file.url
        })
    return JsonResponse(response, safe=False)


@csrf_exempt
def addList(request):
    data = JSONParser().parse(request)
    List.objects.create(
        name=data['name'],
        user=data['user'],
        public=data['access']
    )
    return JsonResponse("ok", safe=False)


@csrf_exempt
def deleteList(request, id):
    List.objects.get(id=id).delete()
    for listItem in ListItem.objects.filter(List=id):
        listItem.delete()
    return JsonResponse("ok", safe=False)


@csrf_exempt
def changePublicList(request):
    data = JSONParser().parse(request)
    nList = List.objects.get(id=data['id'])
    nList.public = data['publicity']
    nList.save()
    return JsonResponse("ok", safe=False)

@csrf_exempt
def editList(request):
    return


@csrf_exempt
def changeTitleList(request):
    data = JSONParser().parse(request)
    nList = List.objects.get(id=data['id'])
    nList.name = data['name']
    nList.save()
    return JsonResponse("ok", safe=False)
