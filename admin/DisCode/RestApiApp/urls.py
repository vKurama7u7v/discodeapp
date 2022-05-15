from rest_framework import routers
from .viewsets import CursoViewset, LanguageViewset, LeccionViewset, SlideViewset, TemaViewset, CodigoViewset

route = routers.SimpleRouter()

route.register('language', LanguageViewset)
route.register('course', CursoViewset)
route.register('tema', TemaViewset)
route.register('leccion', LeccionViewset)
route.register('slide', SlideViewset)
route.register('codigo', CodigoViewset)


urlpatterns = route.urls