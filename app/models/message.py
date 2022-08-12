from .db import db
from datetime import datetime
from sqlalchemy.orm import validates

#foriegn keys have to be declared separately with the ForeignKey class

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id'), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

# Pass in class name as first arg
    conversation = db.relationship('Conversation', back_populates='messages')
    user = db.relationship('User', back_populates='messages')

    def to_dict(self, **kwargs):
        out = {
            'id' : self.id,
            'conversation_id': self.conversation_id,
            'sender_id': self.sender_id,
            'content': self.content,
            'created_at':self.created_at,
        }
        for key, collection in kwargs.items():
                out[key] = collection.to_dict()

        return out

    #custom error validation for the content column
    @validates('content')
    def validate_content(self, key, content):
        if len(content) > 1000:
            raise ValueError('Message cannot be longer than 1000 characters')
        return content
