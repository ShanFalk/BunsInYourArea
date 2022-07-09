from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FloatField, IntegerField, BooleanField
from wtforms.validators import DataRequired

class CreateBunny(FlaskForm):

    user_id = IntegerField('user_id', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    age = FloatField('age', validators=[DataRequired()])
    sex = StringField('sex', validators=[DataRequired()])
    breed = StringField('breed', validators=[DataRequired()])
    biography = TextAreaField('biography', validators=[DataRequired()])
    is_adoptable = BooleanField('is_adoptable', validators=[DataRequired()])

class UpdateBunny(FlaskForm):

    id = IntegerField("id")
    user_id = IntegerField('user_id', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    age = FloatField('age', validators=[DataRequired()])
    sex = StringField('sex', validators=[DataRequired()])
    breed = StringField('breed', validators=[DataRequired()])
    biography = TextAreaField('biography', validators=[DataRequired()])
    is_adoptable = BooleanField('is_adoptable', validators=[DataRequired()])
