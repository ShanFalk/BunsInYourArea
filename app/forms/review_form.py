from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired

class CreateReview(FlaskForm):
    reviewer_id = IntegerField('reviewer_id', validators=[DataRequired()])
    reviewee_id = IntegerField('reviewee_id', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired(message="You must give a rating")])
    content = TextAreaField('content', validators=[DataRequired(message="You must write something")])
