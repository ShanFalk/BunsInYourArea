from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Review, db
from sqlalchemy.orm import joinedload

review_routes = Blueprint('review_routes', __name__)

@review_routes.route('')
def user_reviews():
    reviews = Review.query.options(joinedload('reviewer')).all()
    return {review.id: review.to_dict(reviewer=review.reviewer) for review in reviews}
