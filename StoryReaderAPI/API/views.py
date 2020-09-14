from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .models import Story, Reading
from .serializers import StorySerializer, ReadingSerializer, UserSerializer


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    # Custom method to read a story with our logic. Instead of using pre-defined POST,PUT methods it will use our custom method
    @action(detail=True,methods = ['POST']) # Condition that only POST method is allowed.
    def read_story(self, request, pk = None): 
        if 'isRead' in request.data: # Validation of Request Data
            story = Story.objects.get(id=pk)  #Selecting the Story requested, from the database.
            isRead = request.data['isRead']
            isCurrentlyReading = request.data['isCurrentlyReading']
            user = request.user
            # user = User.objects.get(id=1) # Static 
            response = {'message': 'Its working'}
            
            # If the story and user are present in the database then update the readings else create a new story
            try:
                reading = Reading.objects.get(user=user.id, story = story.id)
                reading.isRead = isRead
                reading.isCurrentlyReading = isCurrentlyReading
                reading.save()
                serializer = ReadingSerializer(reading, many = False)
                response = {'message':'Reading updated','result': serializer.data}
                return Response(response, status = status.HTTP_200_OK)
            except:
                reading = Reading.objects.create(user=user, story = story, isRead = isRead, isCurrentlyReading = isCurrentlyReading)
                serializer = ReadingSerializer(reading, many = False)
                response = {'message':'Reading created','result': serializer.data}
                return Response(response,status = status.HTTP_200_OK)

        else:
            response = {'message':'You need to provide reading status'}
            return Response(response,status = status.HTTP_400_BAD_REQUEST)



class ReadingViewSet(viewsets.ModelViewSet):
    queryset = Reading.objects.all()
    serializer_class = ReadingSerializer
    authentication_classes = (TokenAuthentication,)
    perimission_classes = (AllowAny,)

    # Over writing these methods to restrict the usage of all 5 CRUD methods provided by ModelViewSet
    # Self-define update method overriding pre-defined method:
    def update(self,request,*args,**kwargs):
        response = {'message':'You cant update permissions like that'}
        return Response(response,status = status.HTTP_400_BAD_REQUEST)

    # Self-define create method overriding pre-defined method:
    def create(self,request,*args,**kwargs):
        response = {'message':'You cant create permissions like that'}
        return Response(response,status = status.HTTP_400_BAD_REQUEST)
