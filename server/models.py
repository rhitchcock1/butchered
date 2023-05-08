from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import MetaData, DateTime
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

# bcrypt = Bcrypt(app)
from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ ='users'
    serialize_rules = ("-reviews.user",)
    id = db.Column(db.Integer, primary_key=True)
    # name = db.Column(db.String)
    username = db.Column(db.String, unique=True)
    email = db.Column(db.String)
    admin = db.Column(db.String, default=False)
    _password_hash = db.Column(db.String, nullable=False)
    reviews= db.relationship("Review", backref="user", cascade = 'all, delete-orphan')
    salons= association_proxy("reviews", "salon")

    def __repr__(self):
        return f'User {self.username}, ID {self.id} Admin:{self.admin}'

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python 3
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    # @validates("username")
    # def validate_username(self, key, value):
    #     in_use = User.query.filter_by(username=value).first()
    #     if not in_use:
    #         return value
    #     raise ValueError("Username already in use")


class Salon(db.Model, SerializerMixin):
    __tablename__ = "salons"
    serialize_rules = ("-reviews",)
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable = False)
    location = db.Column(db.String)
    contact = db.Column(db.String)
    image = db.Column(db.String)
    reviews= db.relationship("Review", backref="salon", cascade = 'all, delete-orphan')
    users= association_proxy("reviews", "user")
    @validates ("name")
    def validate_name(self, key, value):
        if not value:
            raise ValueError("must have Salon Name attribute")
        return value

class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"
    serialize_rules = ("-reviews",)
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, )
    helpful = db.Column(db.Integer, default = 0)
    funny = db.Column(db.Integer, default = 0)
    image = db.Column(db.String)

    created_at = db.Column(db.DateTime, server_default= db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    salon_id = db.Column(db.Integer, db.ForeignKey("salons.id"))
    @validates("helpful", "funny")
    def validate_rating(self, key, value):
        if 1 <= int(value):
            return value
        raise ValueError("rating must be between 1 and 5")
