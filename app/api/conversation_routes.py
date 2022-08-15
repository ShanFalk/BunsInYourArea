from operator import and_, or_
from flask import Blueprint, json, request
from app.models import db, Conversation, Message, User
from flask_login import login_required
from sqlalchemy.orm import aliased
from sqlalchemy import or_, and_


conversation_routes = Blueprint('conversations', __name__)

#takes two args: the url and the http verb as a kwarg
@login_required
@conversation_routes.route("", methods=["POST"])
def add_conversation():
    data = json.loads(request.data)
    creator_id = data["creator_id"],
    participant_id = data["participant_id"]

    conversation_check1 = Conversation.query.\
        filter(and_(Conversation.creator_id == creator_id, Conversation.participant_id == participant_id )).\
            first()
    conversation_check2 = Conversation.query.\
        filter(and_(Conversation.creator_id == participant_id, Conversation.participant_id == creator_id)).\
            first()
    if not conversation_check1 and not conversation_check2:
        new_conversation = Conversation(
            creator_id=creator_id,
            participant_id=participant_id
        )
        db.session.add(new_conversation)
        db.session.commit()

        user_alias1 = aliased(User)
        user_alias2 = aliased(User)

        conversation = Conversation.query.get(new_conversation.id)
        return conversation.to_dict()
    return {'errors': 'This conversation already exists! Check your messages tab'}, 400

@login_required
@conversation_routes.route("/<int:id>/messages", methods=["GET"])
def conversation_messages(id):

    messages = Message.query.\
        join(Message.user).\
        filter(Message.conversation_id == id).all()

    return {message.id: message.to_dict(sender=message.user) for message in messages}
