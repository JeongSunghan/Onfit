from django.urls import path
from .views import SignupView, LoginView  # 클래스 직접 import

urlpatterns = [
    # 회원가입 API 엔드포인트
    # 클래스 기반 뷰이므로 반드시 .as_view()를 호출해야 함
    path('signup/', SignupView.as_view(), name='signup'),

    # 로그인 API 엔드포인트
    path('login/', LoginView.as_view(), name='login'),
]
