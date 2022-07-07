from .db import db
from datetime import datetime
from sqlalchemy.orm import validates


class Bunny(db.Model):
    __tablename__ = 'bunnies'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    age = db.Column(db.Numeric(4,2), nullable=False)
    gender = db.Column(db.String(6), nullable=False)
    color = db.Column(db.String(30), nullable=False)
    biography = db.Column(db.Text)
    image_url = db.Column(db.Text)
    is_adoptable = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    user = db.relationship("User", back_populates="bunnies")
    likes = db.relationship("Like", back_populates="bunny")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'age': self.age,
            'gender': self.gender,
            'color': self.color,
            'image_url': self.image_url,
            'biography': self.biography,
            'is_adoptable': self.is_adoptable,
            'created_at':self.created_at,
        }

    @validates('name')
    def validate_name(self, key, name):
        if len(name) <= 2:
            raise ValueError('name is too short')
        return name
