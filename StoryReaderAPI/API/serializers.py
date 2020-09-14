from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import Story,Reading
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','password')
        extra_kwargs = {'password':{'write_only':True,'required':True}}
    
    # For registration of a new user
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user) # For generating a new Token for the new user
        return user
 
class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = ('id','title','content','no_of_reads', 'current_readers')

class ReadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reading
        fields = ('id','isRead','isCurrentlyReading','user','story')