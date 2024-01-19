from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('banking', '0005_alter_creditcard_account_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='creditcard',
            name='card_name',
            field=models.CharField(default='', max_length=100),
        ),
    ]