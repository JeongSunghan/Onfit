from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .models import Profile  # Profile 모델 import

class SignupView(APIView):
    """
    회원가입 API 뷰
    POST 요청으로 username, password, location을 받아서 새 사용자 및 프로필 생성
    생성 성공 시 인증 토큰을 발급하여 반환
    """
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        location = request.data.get('location', '')  # location 값 받기 (없으면 빈 문자열)

        # 이미 존재하는 username인지 확인
        if User.objects.filter(username=username).exists():
            return Response({'error': '이미 존재하는 사용자입니다.'}, status=400)
        
        # 새 사용자 생성 (비밀번호는 해시되어 저장됨)
        user = User.objects.create_user(username=username, password=password)
        
        # 새 프로필 생성 및 위치 정보 저장
        Profile.objects.create(user=user, location=location)

        # 사용자에 대한 토큰 생성 또는 기존 토큰 가져오기
        token, _ = Token.objects.get_or_create(user=user)

        # 생성된 토큰을 JSON 형태로 반환하며 201 상태 코드 전송
        return Response({'token': token.key}, status=201)


class LoginView(APIView):
    """
    로그인 API 뷰
    POST 요청으로 username과 password를 받아 인증 후 토큰 반환
    인증 실패 시 400 에러와 메시지 반환
    """
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})

        return Response({'error': '로그인 실패'}, status=400)
