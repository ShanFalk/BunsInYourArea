from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def review_length_max(form, field):
    content = field.data
    if len(content) > 500:
        raise ValidationError('Review content is too long')

class CreateReview(FlaskForm):
    reviewer_id = IntegerField('reviewer_id', validators=[DataRequired()])
    reviewee_id = IntegerField('reviewee_id', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired(message="You must give a rating")])
    content = TextAreaField('content', validators=[DataRequired(message="You must write something"), review_length_max])

class UpdateReview(FlaskForm):
    id = IntegerField("id")
    reviewer_id = IntegerField('reviewer_id', validators=[DataRequired()])
    reviewee_id = IntegerField('reviewee_id', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired(message="You must give a rating")])
    content = TextAreaField('content', validators=[DataRequired(message="You must write something"), review_length_max])
