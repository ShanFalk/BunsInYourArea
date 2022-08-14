from flask import Blueprint, jsonify
from flask_login import login_required, current_user, login_manager
from app.models import User, Like, Conversation
from sqlalchemy import or_
from sqlalchemy.orm import contains_eager, aliased

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
#login_required not working properly, commented out for now
#could be due to the url specified above. I think it should be
# "" and not '/'
# @login_required
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

@login_required
#When using parameters, Flask allows you to specify
# the type of data you expect to receive.
@user_routes.route('/<int:id>/conversations', methods=["GET"])
def user_conversations(id):
    #To reference the same table more than once, the table
    #must be aliased
    user_alias1 = aliased(User)
    user_alias2 = aliased(User)
    #To add a filter to a join query, you must use join rather than
    #joinedload. Joinedload data is transparent and cannot be altered,
    #but join data can.
    conversations = Conversation.query.\
        join(user_alias1, Conversation.creator).\
        join(user_alias2, Conversation.participant).\
        filter(or_(Conversation.creator_id == id, Conversation.participant_id == id))

    print('*'*50, {conversation.participant for conversation in conversations})
    return {conversation.id: conversation.to_dict(creator=conversation.creator, participant=conversation.participant) for conversation in conversations}
