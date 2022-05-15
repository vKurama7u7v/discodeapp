from rest_framework import serializers
from SandboxApp.models import Language
from CursosApp.models import Curso, Tema, Leccion, Slide, Codigo

# * ===== SERIALIZER LENGUAJES ===== *
class LanguageSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name', read_only=True)
    status = serializers.BooleanField(source='category.status', read_only=True)

    class Meta:
        model = Language
        fields = ('id', 'name', 'language', 'category', 'icon', 'status', 'createdAt')


# * ===== SERIALIZER CURSOS ===== *
class CursoSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name', read_only=True)
    subcategorias = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Curso
        fields = [
            'id',
            'name',
            'thumbnail',
            'description',
            'status',
            'createdAt',
            'category',
            'subcategorias'
            ]


# * ===== SERIALIZER TEMAS ===== *
class TemaSerializer(serializers.ModelSerializer):
    curso_name = serializers.CharField(source='curso.name', read_only=True)

    class Meta:
        model = Tema
        fields = [
            'id',
            'name',
            'curso',
            'curso_name',
            'createdAt',
            ]


# * ===== SERIALIZER LECCIONES ===== *
class LeccionSerializer(serializers.ModelSerializer):
    tema_name = serializers.CharField(source='tema.name', read_only=True)

    class Meta:
        model = Leccion
        fields = [
            'id',
            'name',
            'tema',
            'tema_name',
            'createdAt',
            ]


# * ===== SERIALIZER SLIDE ===== *
class SlideSerializer(serializers.ModelSerializer):
    leccion_name = serializers.CharField(source='leccion.name', read_only=True)
    clase_name = serializers.CharField(source='clase.name', read_only=True)
    clase_identifier = serializers.CharField(source='clase.identifier', read_only=True)

    class Meta:
        model = Slide
        fields = [
            'id',
            'name',
            'leccion',
            'leccion_name',
            'clase',
            'clase_name',
            'clase_identifier',
            'content',
            'url',
            'code',
            'createdAt',
            ]

# * ===== SERIALIZER CÓDIGO ===== *
class CodigoSerializer(serializers.ModelSerializer):
    leccion_name = serializers.CharField(source='leccion.name', read_only=True)
    language_name = serializers.CharField(source='language.language', read_only=True)

    class Meta:
        model = Codigo
        fields = [
            'id',
            'name',
            'leccion',
            'leccion_name',
            'language',
            'language_name',
            'code',
            'createdAt',
        ]