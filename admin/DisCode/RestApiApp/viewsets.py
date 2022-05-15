from rest_framework import viewsets

from .serializers import CursoSerializer, LanguageSerializer, LeccionSerializer, SlideSerializer, TemaSerializer, CodigoSerializer
from SandboxApp.models import Language
from CursosApp.models import Curso, Tema, Leccion, Slide, Codigo

# * ===== VIEWSET LENGUAJES ===== *
class LanguageViewset(viewsets.ModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer


# * ===== VIEWSET CURSOS ===== *
class CursoViewset(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer


# * ===== VIEWSET TEMA ===== *
class TemaViewset(viewsets.ModelViewSet):
    queryset = Tema.objects.all()
    serializer_class = TemaSerializer


# * ===== VIEWSET LECCION ===== *
class LeccionViewset(viewsets.ModelViewSet):
    queryset = Leccion.objects.all()
    serializer_class = LeccionSerializer


# * ===== VIEWSET SLIDE ===== *
class SlideViewset(viewsets.ModelViewSet):
    queryset = Slide.objects.all()
    serializer_class = SlideSerializer


# * ===== VIEWSET CÓDIGO ===== *
class CodigoViewset(viewsets.ModelViewSet):
    queryset = Codigo.objects.all()
    serializer_class = CodigoSerializer