# Remote library imports
from flask import request, make_response, session, render_template
from flask_restful import Resource
from flask import Flask
# from client/public/index.html import index.html
# from index.html import client/public/index.html

# Local imports
from config import app, db, api
from models import User,Salon, Review
from dotenv import load_dotenv
load_dotenv()

@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template(app.template_folder, 'index.html')   
# @app.route('/')
# def index():
#     return {}, 200
class Users(Resource):
    def get(self):
        user_list = [u.to_dict() for u in User.query.all()]
        if user_list == None:
            return make_response({"error":"user not found"}, 404)
        return make_response(user_list, 200)
    def post(self):
        data = request.get_json()
        try:
            new_user = User(
                name= data["name"],
                username=data["username"],
                email=data["email"],
                admin=data["admin"],
                _password_hash=data["_password_hash"],
            )
        except ValueError:
            return make_response({"error": "must be valid user"}, 404)
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        return make_response(new_user.to_dict(), 201)
  
api.add_resource(Users, "/users")

class UserById(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if user is None:
            return make_response({"error": "user not found"}, 404)
        return make_response(user.to_dict(), 200)
    
api.add_resource(UserById, "/users/<int:id>")

class Salons (Resource):
    def get(self):
        salon_list = [s.to_dict() for s in Salon.query.all()]
        if salon_list == None:
            return make_response({"error":"salon not found"}, 404)
        return make_response(salon_list, 200)
    
    def post(self):
        data = request.get_json()
        try:
            new_salon = Salon(
                name = data["name"],
                location = data["location"],
                contact = data["contact"],
                image = data["image"],
            )
        except ValueError:
            return make_response({"error": "must be valid salon"}, 404)
        db.session.add(new_salon)
        db.session.commit()
        return make_response(new_salon.to_dict(), 201)

api.add_resource(Salons, "/api/salons", endpoint = "salon_list")

class SalonById(Resource):
    def get (self, id):
        salon = Salon.query.filter_by(id = id).first()
        if salon == None:
            return make_response({"error":"salon not found"}, 404)
        return make_response(salon.to_dict(), 200)
    
    def delete(self, id):
        salon = Salon.query.filter_by(id = id).first()
        if salon == None:
            return make_response({"error":"salon not found"}, 404)
        db.session.delete(salon)
        db.session.commit()
        return make_response({"deleted": "she gone"}, 204)
    
api.add_resource(SalonById, "/api//salons/<int:id>", endpoint="ind_salon")

class Reviews(Resource):
    def get(self):
        review_list = [r.to_dict() for r in Review.query.all()]
        if review_list == None:
            return make_response({"error":"review not found"}, 404)
        return make_response (review_list, 200)
    
    def post(self):
        data = request.get_json()
        try:
            new_review = Review (
            content = data['content'],
          
           image =data["image"],
            user_id = data["user_id"],
            salon_id = data["salon_id"],
            )
        except ValueError:
            return make_response({"error": "must be valid review"}, 404)

        db.session.add(new_review)
        db.session.commit()
        return make_response(new_review.to_dict(), 201)
    
api.add_resource(Reviews, "/api/reviews", endpoint = "review_list")

class ReviewById(Resource):
    def get(self, id):
        review = Review.query.filter_by(id = id).first()
        if review == None:
            return make_response({"error":"review not found"}, 404)
        return make_response(review.to_dict(), 200)
    
    def delete(self, id):
        review = Review.query.filter_by(id = id).first()
        if review == None:
            return make_response({"error":"review not found"}, 404)
        db.session.delete(review)
        db.session.commit()
        return make_response({"deleted": "she gone"}, 204)
    
    def patch(self, id):
        review = Review.query.filter_by(id = id).first()
        data = request.get_json()
        for attr in data:
            setattr(review, attr, data[attr])
        db.session.add(review)
        db.session.commit()
        return make_response(review.to_dict(), 201)
    
api.add_resource(ReviewById, "/api/reviews/<int:id>", endpoint="ind_review")

class ClearSession(Resource):

    def delete(self):
    
        session['page_views'] = None
        session['user_id'] = None

        return {}, 204
api.add_resource(ClearSession, '/clear', endpoint='clear')

class Signup(Resource):

    def post(self):
        
        username = request.get_json()['username']
        password= request.get_json()['_password_hash']
        email = request.get_json()["email"]

        if username and password and email:
            
            new_user = User(username=username, email=email)
            new_user.password_hash = password
            db.session.add(new_user)
            db.session.commit()

            session['user_id'] = new_user.id
            # session["password"] = new_user._password_hash
            
            return new_user.to_dict(), 201

        return {'error': '422 Unprocessable Entity'}, 422
api.add_resource(Signup, '/api/signup', endpoint='signup')

class CheckSession(Resource):

    def get(self):
        if session.get('user_id'):
            user= User.query.filter(User.id == session['user_id']).first()
            return make_response(  user.to_dict(), 200 )
        return {}, 204
api.add_resource(CheckSession, '/check_session', endpoint='check_session')   


class Login(Resource):

    def post(self):

        username = request.get_json()['username']
        password = request.get_json()['password']

        user = User.query.filter(User.username == username ).first()
        password = User.query.filter(User._password_hash == password ).first()

        if user and password:

            session['user_id'] = user.id
            session["password"] = user._password_hash
            return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401
api.add_resource(Login, '/api/login', endpoint='login')

class Logout(Resource):

    def delete(self):

        session['user_id'] = None

        return {}, 204
api.add_resource(Logout, '/api/logout', endpoint='logout')
# api.add_resource(ClearSession, '/clear', endpoint='clear')
# api.add_resource(Signup, '/signup', endpoint='signup')
# api.add_resource(CheckSession, '/check_session', endpoint='check_session')
# api.add_resource(Login, '/login', endpoint='login')
# api.add_resource(Logout, '/logout', endpoint='logout')

# if __name__ == '__main__':
#     ( debug=True)