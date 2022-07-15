from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def firstname_length_min(form, field):
    firstname = field.data
    if len(firstname) < 2:
        raise ValidationError('First name is too short')

def firstname_length_max(form, field):
    firstname = field.data
    if len(firstname) > 30:
        raise ValidationError('First name is too long')

def lastname_length_min(form, field):
    lastname = field.data
    if len(lastname) < 2:
        raise ValidationError('Last name is too short')

def lastname_length_max(form, field):
    lastname = field.data
    if len(lastname) > 30:
        raise ValidationError('Last name is too long')

def username_length_max(form, field):
    username = field.data
    if len(username) > 30:
        raise ValidationError('Username is too long')

def username_length_min(form, field):
    username = field.data
    if len(username) < 3:
        raise ValidationError('Username is too short')

def city_length_max(form, field):
    city = field.data
    if len(city) > 50:
        raise ValidationError('City is too long')

def city_length_min(form, field):
    city = field.data
    if len(city) < 2:
        raise ValidationError('City is too short')

def bio_length_max(form, field):
    biography = field.data
    if len(biography) > 500:
        raise ValidationError('Biography is too long')


class SignUpForm(FlaskForm):
    firstname = StringField('firstname', validators=[DataRequired('Please provide a first name'), firstname_length_min, firstname_length_max])
    lastname = StringField('lastname', validators=[DataRequired('Please provide a last name'), lastname_length_min, lastname_length_max])
    username = StringField(
        'username', validators=[DataRequired('Please provide a username'), username_exists, username_length_min, username_length_max])
    email = StringField('email', validators=[DataRequired('Please provide an email address'), user_exists, Email(message='Please provide a valid email address')])
    password = StringField('password', validators=[DataRequired('Please provide a password')])
    biography = TextAreaField('biography', validators=[bio_length_max])
    city = StringField('city', validators=[DataRequired('Please provide a city'), city_length_max, city_length_min])
    state = StringField('state', validators=[DataRequired('Please provide a state')])
