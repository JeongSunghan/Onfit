
from pathlib import Path
from dotenv import load_dotenv
import os


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / '.env')

raw_hosts = os.getenv("DJANGO_ALLOWED_HOSTS", "")
# hosts = env로 받아오기, 문제 발생시 아래 주석처리한 부분 오픈 이후, 주석처리 할 것!!
ALLOWED_HOSTS=[h.strip() for h in raw_hosts.split(",") if h.strip()]

if not ALLOWED_HOSTS and os.getenv("DJANGO_ENV") == "production":
    raise RuntimeError("ALLOWED_HOSTS 가 비어있습니다. .env 파일 검토 바람")


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-qknqgf=b@c@=u46lor(u+ob)zird=z3ali@obeso)r*0r_lj8t'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# ALLOWED_HOSTS = ['*', 'localhost', '127.0.0.1', '192.168.55.1'] # ip주소 변경필요

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

     # 사용자 계정 관련 앱
    'accounts.apps.AccountsConfig',
    # Django REST Framework
    'rest_framework',
    # 토큰 기반 인증
    'rest_framework.authtoken',
    # CORS 설정
    'corsheaders',

]

REST_FRAMEWORK = {
    # 기본 인증 방식 설정: 토큰 인증 사용
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    # 기본 권한 설정: 모든 요청 허용
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny', 
    ],
}


MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # 맨 위에 추가 권장

    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOW_ALL_ORIGINS = True # CORS 허용설정

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.getenv('DB_NAME'),                # DB 이름
        'USER': os.getenv('DB_USER'),                 # 사용자명
        'PASSWORD': os.getenv('DB_PASSWORD'),       # 비밀번호
        'HOST': 'localhost',            # 또는 IP
        'PORT': '3306',                 # MariaDB 기본 포트
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"
        }
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
