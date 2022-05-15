from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from CursosApp.forms import CursoForm
from CursosApp.models import CategoriaCurso, SubCategoriaCurso, Curso, Tema, Leccion, Slide, TypeSlide, Codigo
# Register your models here.

# * ===== ADMIN CATEGORIA CURSO ===== * #
class CategoriaResource(resources.ModelResource):
    class Meta:
        model = CategoriaCurso

class CategoriaAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = ["name"]
    list_display = ("id", "name", "status", "createdAt")
    resources_class = CategoriaResource

admin.site.register(CategoriaCurso, CategoriaAdmin)


# * ===== ADMIN SUBCATEGORIA CURSO ===== * #
class SubCategoriaResource(resources.ModelResource):
    class Meta:
        model = SubCategoriaCurso

class SubCategoriaAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = ["name"]
    list_display = ("id", "name", "status", "createdAt")
    resources_class = SubCategoriaResource

admin.site.register(SubCategoriaCurso, SubCategoriaAdmin)


# * ===== ADMIN CURSO ===== * #
class CursoResource(resources.ModelResource):
    class Meta:
        model = Curso

class CursoAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = ["name", "category"]
    list_display = ("id", "name", "category", "status", "createdAt")
    resources_class = CursoResource

admin.site.register(Curso, CursoAdmin)


# * ===== ADMIN TEMA ===== * #
class TemaResource(resources.ModelResource):
    class Meta:
        model = Tema

class TemaAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = ["name", "curso"]
    list_display = ("id", "name", "curso", "createdAt")
    resources_class = TemaResource

admin.site.register(Tema, TemaAdmin)


# * ===== ADMIN LECCIÓN ===== * #
class LeccionResource(resources.ModelResource):
    class Meta:
        model = Leccion

class LeccionAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = ["name", "tema"]
    list_display = ("id", "name", "tema", "createdAt")
    resources_class = LeccionResource

admin.site.register(Leccion, LeccionAdmin)


# * ===== ADMIN TIPO DE SLIDE ===== * #
class TypeSlideResource(resources.ModelResource):
    class Meta:
        model = TypeSlide

class TypeSlideAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = ["name"]
    list_display = ("id", "name", "identifier", "createdAt")
    resources_class = TypeSlideResource

admin.site.register(TypeSlide, TypeSlideAdmin)


# * ===== ADMIN SLIDE ===== * #
class SlideResource(resources.ModelResource):
    class Meta:
        model = Slide

class SlideAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = ["name", "leccion", "clase"]
    list_display = ("id", "name", "leccion", "clase", "createdAt")
    resources_class = SlideResource

admin.site.register(Slide, SlideAdmin)


# * ===== ADMIN CODE ===== * #
class CodeResource(resources.ModelResource):
    class Meta:
        model = Codigo

class CodigoAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = ["name", "leccion", "language"]
    list_display = ("id", "name", "leccion", "language", "createdAt")
    resources_class = CodeResource

admin.site.register(Codigo, CodigoAdmin)
