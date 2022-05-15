from django import forms
from bson.objectid import ObjectId
from CursosApp.models import CategoriaCurso, SubCategoriaCurso, Curso

# * ===== FORM CURSO ===== *
class CursoForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
         super(CursoForm, self).__init__(*args, **kwargs)

         for i in iter(self.fields):
             self.fields[i].widget.attrs.update({
                 'class': 'form-control'
             })

    class Meta:
        model = Curso
        fields = ['name', 'description', 'thumbnail', 'category', 'subcategorias', 'status']