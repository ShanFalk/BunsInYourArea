from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Like

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@login_required
@user_routes.route('/<int:id>/likes')
def user_likes(id):
    likes = Like.query.filter(Like.user_id == id).all()
    return {like.bunny_id: like.to_dict() for like in likes}
