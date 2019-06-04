from django.conf.urls import url, include
from rest_framework import routers
from .views import UserViewset

router = routers.DefaultRouter()

router.register(r'user', UserViewset)

# Inlcude the schema view in our urls.
# app_name = '[user]'
urlpatterns = [
        url(r'', include(router.urls)),
    ]