from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .views import StoryViewSet,ReadingViewSet,UserViewSet

router = routers.DefaultRouter()
router.register('stories',StoryViewSet)
router.register('readings',ReadingViewSet)
router.register('users',UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]