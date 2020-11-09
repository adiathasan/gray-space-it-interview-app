from django.shortcuts import render
import requests

url = 'https://jsonplaceholder.typicode.com'

# POSTS VIEW ENDPOINT


def posts(request):
    res = requests.get(f'{url}/posts')
    posts = res.json()
    context = {"posts": posts}
    return render(request, 'blog-listing.html', context)


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

    context = {"post": post, "comments": comments, "user": user}
    return render(request, 'blog-post.html', context)
