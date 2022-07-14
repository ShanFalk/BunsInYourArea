from xml.dom import ValidationErr
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FloatField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError

def name_length_max(form, field):
    name = field.data
    print('*'*50, name)
    if len(name) > 50:
        raise ValidationError('Name is too long')

def name_length_min(form, field):
    name = field.data
    if len(name) < 2:
        raise ValidationError('Name is too short')

def breed_length_max(form, field):
    name = field.data
    if len(name) > 30:
        raise ValidationError('Breed is too long')

class CreateBunny(FlaskForm):

    user_id = IntegerField('user_id', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired(), name_length_max, name_length_min])
    age = FloatField('age', validators=[DataRequired()])
    sex = StringField('sex', validators=[DataRequired()])
    breed = StringField('breed', validators=[DataRequired(), breed_length_max])
    biography = TextAreaField('biography')
    is_adoptable = BooleanField('is_adoptable')

class UpdateBunny(FlaskForm):

    id = IntegerField("id")
    user_id = IntegerField('user_id', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    age = FloatField('age', validators=[DataRequired()])
    sex = StringField('sex', validators=[DataRequired()])
    breed = StringField('breed', validators=[DataRequired()])
    biography = TextAreaField('biography', validators=[DataRequired()])
    is_adoptable = BooleanField('is_adoptable')
