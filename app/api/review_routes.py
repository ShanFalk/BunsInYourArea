from crypt import methods
from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Review, db
from sqlalchemy.orm import joinedload
from app.forms import CreateReview
from app.utils import format_errors

review_routes = Blueprint('review_routes', __name__)

@review_routes.route('')
def user_reviews():
    reviews = Review.query.options(joinedload('reviewer')).all()
    return {review.id: review.to_dict(reviewer=review.reviewer) for review in reviews}

@login_required
@review_routes.route('', methods=["POST"])
def create_review():

    form = CreateReview()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review(
            reviewer_id=form.data["reviewer_id"],
            reviewee_id=form.data["reviewee_id"],
            rating=form.data["rating"],
            content=form.data["content"]
        )
        db.session.add(new_review)
        db.session.commit()

        review = Review.query.options(joinedload('reviewer')).get(new_review.id)
        return review.to_dict(reviewer=review.reviewer)
    return {'errors': format_errors(form.errors)}, 401
