from django.urls import path
from posts.views import posts, post_details

urlpatterns = [
    path('', posts, name="home"),
    path('<int:pk>/', post_details)
]
