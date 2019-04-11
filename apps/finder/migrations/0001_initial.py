# Generated by Django 2.2 on 2019-04-11 04:51

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
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(null=True)),
            ],
            options={
                'db_table': 'category',
            },
        ),
        migrations.CreateModel(
            name='EmailAddress',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email_address', models.CharField(max_length=100, null=True)),
            ],
            options={
                'db_table': 'email_address',
            },
        ),
        migrations.CreateModel(
            name='Organization',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(null=True)),
                ('website', models.TextField(null=True)),
                ('yelp', models.TextField(null=True)),
                ('youtube', models.TextField(null=True)),
                ('facebook', models.TextField(null=True)),
                ('twitter', models.TextField(null=True)),
                ('email', models.TextField(null=True)),
            ],
            options={
                'db_table': 'organization',
            },
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=50, null=True)),
                ('middle_name', models.CharField(max_length=50, null=True)),
                ('last_name', models.CharField(max_length=50, null=True)),
                ('gender', models.CharField(max_length=1, null=True)),
                ('birthdate', models.DateTimeField()),
            ],
            options={
                'db_table': 'person',
            },
        ),
        migrations.CreateModel(
            name='PhoneNumber',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('area_code', models.CharField(max_length=3, null=True)),
                ('phone_number', models.CharField(max_length=7, null=True)),
                ('priority', models.IntegerField()),
            ],
            options={
                'db_table': 'phone_number',
            },
        ),
        migrations.CreateModel(
            name='PostalAddress',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('street1', models.CharField(max_length=100, null=True)),
                ('street2', models.CharField(max_length=100, null=True)),
                ('city', models.CharField(max_length=100, null=True)),
                ('state_code', models.CharField(max_length=2, null=True)),
                ('zip_code', models.CharField(max_length=10, null=True)),
                ('latitude', models.DecimalField(decimal_places=9, max_digits=11, null=True)),
                ('longitude', models.DecimalField(decimal_places=9, max_digits=12, null=True)),
                ('organization', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='postal_addresses', to='finder.Organization')),
            ],
            options={
                'db_table': 'postal_address',
            },
        ),
        migrations.CreateModel(
            name='CategoryQuantity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField()),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='finder.Category')),
                ('organization', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='category_quantities', to='finder.Organization')),
            ],
        ),
    ]
