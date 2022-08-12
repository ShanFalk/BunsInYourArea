from .db import db
from datetime import datetime
from sqlalchemy.orm import validates

#foriegn keys have to be declared separately with the ForeignKey class

class Conversation(db.Model):
    __tablename__ = 'conversations'

    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    participant_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    creator = db.relationship('User', foreign_keys=[creator_id], back_populates='creator_user')
    participant = db.relationship('User', foreign_keys=[participant_id], back_populates='participant_user')
    messages = db.relationship('Message', back_populates='conversation')

    def to_dict(self, **kwargs):
        out = {
            "id": self.id,
            "creator_id": self.creator_id,
            "participant_id": self.participant_id,
        }

        for key, collection in kwargs.items():
                out[key] = collection.to_dict()

        return out
