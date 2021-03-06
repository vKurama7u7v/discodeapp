# Generated by Django 3.0.5 on 2022-05-10 22:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50, verbose_name='Nombre')),
                ('status', models.BooleanField(default=True, verbose_name='Activado/Desactivado')),
                ('createdAt', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
            ],
            options={
                'verbose_name': 'categoria',
                'verbose_name_plural': 'categorias',
                'ordering': ['-createdAt'],
            },
        ),
        migrations.CreateModel(
            name='Language',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50, verbose_name='Nombre')),
                ('status', models.BooleanField(default=True, verbose_name='Activado/Desactivado')),
                ('language', models.CharField(max_length=50, verbose_name='Lenguaje')),
                ('icon', models.URLField(max_length=510, verbose_name='Icono')),
                ('createdAt', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='SandboxApp.Category')),
            ],
            options={
                'verbose_name': 'lenguaje',
                'verbose_name_plural': 'lenguajes',
                'ordering': ['createdAt'],
            },
        ),
    ]
