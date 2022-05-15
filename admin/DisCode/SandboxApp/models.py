from tabnanny import verbose
from django.db import models

# Create your models here.

# * ===== MODELO ===== *
class Base(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField("Nombre", max_length=50, null=False, blank=False)
    status = models.BooleanField("Activado/Desactivado", default=True)

    class Meta:
        abstract = True

    @property
    def pk(self):
        return self.id

    def __str__(self):
        return self.name


# * ===== MODELO CATEGORIA LENGUAJE ===== *
class Category(Base):
    createdAt = models.DateTimeField("Fecha de Creación", auto_now=False, auto_now_add=True)

    class Meta:
        verbose_name = "categoria"
        verbose_name_plural = "categorias"
        ordering = ["-createdAt"]


# * ===== MODELO LENGUAJE ===== *
class Language(Base):
    language = models.CharField("Lenguaje", max_length=50, null=False, blank=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    icon = models.URLField("Icono", max_length=510, null=False, blank=False)
    createdAt = models.DateTimeField("Fecha de Creación", auto_now=False, auto_now_add=True)

    class Meta:
        verbose_name = "lenguaje"
        verbose_name_plural = "lenguajes"
        ordering = ["createdAt"]