from django.urls import path
from .views import SignupView, LoginView  # 클래스 직접 import

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),  # 클래스니까 .as_view() 꼭 붙이기
    path('login/', LoginView.as_view(), name='login'),
]
