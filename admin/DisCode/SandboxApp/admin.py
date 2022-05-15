from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from SandboxApp.models import Category, Language

# Register your models here.

# * ===== ADMIN CATEGORIA LENGUAJE ===== * #
class CategoryResource(resources.ModelResource):
    class Meta:
        model = Category


class CategoryAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = ["name"]
    list_display = ("id", "name", "createdAt")
    resources_class = CategoryResource

admin.site.register(Category, CategoryAdmin)


# * ===== ADMIN LENGUAJE ===== * #
class LanguageResource(resources.ModelResource):
    class Meta:
        model = Language


class LanguageAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = ["name", "category"]
    list_display = ("id", "name", "category", "createdAt")
    resources_class = LanguageResource

admin.site.register(Language, LanguageAdmin)