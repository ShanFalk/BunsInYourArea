from .db import db
from datetime import datetime

class Like(db.Model):
    __tablename__ = 'likes'

id = db.Column(db.Integer, primary_key=True)
user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
bunny_id = db.Column(db.Integer, db.ForeignKey('bunnies.id'), nullable=False)
created_at = db.Column(db.DateTime, default=datetime.now())
updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

user = db.relationship("User", back_populates="likes")
bunny = db.relationship("Bunny", back_populates="likes")

def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "bunny_id": self.bunny_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
