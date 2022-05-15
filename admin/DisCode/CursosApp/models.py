from django.db import models
from SandboxApp.models import Language

# Create your models here.
# * ===== MODELO ===== *
class Base(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField("Nombre", max_length=255, null=False, blank=False)
    createdAt = models.DateTimeField("Fecha de Creación", auto_now=False, auto_now_add=True)

    class Meta:
        abstract = True
        ordering = ["-createdAt"]

    @property
    def pk(self):
        return self.id

    def __str__(self):
        return self.name

# * ===== MODELO CATEGORIA CURSO ===== *
class CategoriaCurso(Base):
    status = models.BooleanField("Activada/Desactivada", default=True)

    class Meta:
        verbose_name = "categoria"
        verbose_name_plural = "categorias"


# * ===== MODELO SUBCATEGORIA CURSO ===== *
class SubCategoriaCurso(Base):
    status = models.BooleanField("Activada/Desactivada", default=True)

    class Meta:
        verbose_name = "subcategoria"
        verbose_name_plural = "subcategorias"


# * ===== MODELO CURSO ===== *
class Curso(Base):
    description = models.TextField("Descripción", max_length=500, null=False, blank=False)
    thumbnail = models.URLField("Thumbnail", max_length=510, null=False, blank=False)

    category = models.ForeignKey(CategoriaCurso, on_delete=models.CASCADE)
    subcategorias = models.ManyToManyField(SubCategoriaCurso)

    status = models.BooleanField("Activada/Desactivada", default=True)

    class Meta:
        verbose_name = "curso"
        verbose_name_plural = "cursos"


# * ===== MODELO TEMA ===== *
class Tema(Base):
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "tema"
        verbose_name_plural = "temas"


# * ===== MODELO LECCION ===== *
class Leccion(Base):
    tema = models.ForeignKey(Tema, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "leccion"
        verbose_name_plural = "lecciones"


# * ===== MODELO TIPO SLIDE ===== *
class TypeSlide(Base):
    identifier = models.CharField("Identificador" ,max_length=100, null=False, blank=False)

    class Meta:
        verbose_name = "ztype_slide"
        verbose_name_plural = "ztype_slides"

    def __str__(self):
        return self.identifier


# * ===== MODELO SLIDE ===== *
class Slide(Base):
    leccion = models.ForeignKey(Leccion, on_delete=models.CASCADE)
    clase = models.ForeignKey(TypeSlide, on_delete=models.CASCADE)

    content = models.TextField("Parrafo", max_length=600, blank=True)
    url = models.URLField("Imagen/Video", max_length=510, blank=True)
    code = models.TextField("Código", max_length=10000, blank=True)

    class Meta:
        verbose_name = "slide"
        verbose_name_plural = "slides"


# * ===== MODELO CÓDIGO ===== *
class Codigo(Base):
    leccion = models.ForeignKey(Leccion, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    code = models.TextField("Código Ejemplo", max_length=510, blank=True)

    class Meta:
        verbose_name = "codigo"
        verbose_name_plural = "codigos"