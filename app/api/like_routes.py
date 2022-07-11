from crypt import methods
from flask import Blueprint, json, request
from app.models import db, Like
from flask_login import login_required

like_routes = Blueprint('likes', __name__)

@login_required
@like_routes.route("", methods=["POST"])
def post_like():

    data = json.loads(request.data)
    new_like = Like(
        user_id = data["user_id"],
        bunny_id = data["bunny_id"]
        )
    db.session.add(new_like)
    db.session.commit()

    like = Like.query.get(new_like.id)
    return like.to_dict()

@login_required
@like_routes.route("/<int:id>", methods=["DELETE"])
def delete_like(id):
    like = Like.query.get(id)
    db.session.delete(like)
    db.session.commit()
    return like.to_dict()
