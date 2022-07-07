from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from sqlalchemy.orm import validates


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(30), nullable=False)
    lastname = db.Column(db.String(30), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.Text)
    biography = db.Column(db.Text)
    city = db.Column(db.String(30), nullable=False)
    state = db.Column(db.String(30), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    bunnies = db.relationship("Bunny", back_populates="user")
    reviewer_user = db.relationship("Review", foreign_keys="Review.reviewer_id", back_populates="reviewer", lazy="dynamic")
    reviewee_user = db.relationship("Review", foreign_keys="Review.reviewee_id", back_populates="reviewee", lazy="dynamic")
    likes = db.relationship("Like", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'username': self.username,
            'email': self.email,
            'image_url': self.image_url,
            'biography': self.biography,
            'city': self.city,
            'state': self.state,
            'created_at':self.created_at,
        }
