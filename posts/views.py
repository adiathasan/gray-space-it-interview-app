from django.shortcuts import render, HttpResponse
import requests

url = 'https://jsonplaceholder.typicode.com'

# POSTS VIEW ENDPOINT


def posts(request):
    start_post = request.GET.get("start", 0)
    limit_post = request.GET.get("limit", 10)
    res = requests.get(f'{url}/posts?_start={start_post}&_limit={limit_post}')
    if res:
        posts = res.json()
        context = {"posts": posts, "pagination":  range(
            1, int(100/int(limit_post))),  "limit_post": int(limit_post), "active": int(start_post)/int(limit_post), "title": "CodeBlog"}
        return render(request, 'blog-listing.html', context)

    return HttpResponse("Oops! please check your network connection")


# POST DETAILS VIEW ENDPOINT
def post_details(request, pk):
    res_post = requests.get(f'{url}/posts/{pk}')
    post = res_post.json()

    # /posts/1/comments
    # -------------> or
    # /commnets?postId=1

    res_commnets = requests.get(
        f'{url}/comments?postId={dict(post).get("id")}')
    comments = res_commnets.json()

    res_user = requests.get(f'{url}/users/{dict(post).get("userId")}')
    user = res_user.json()

    context = {"post": post, "comments": comments,
               "user": user, "title": f"CodeBlog | {dict(post).get('title')}"}
    return render(request, 'blog-post.html', context)
