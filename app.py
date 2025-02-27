from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/game")
def game():
    return render_template("game.html" )

# @app.route("/store_score", methods=["POST"])
# def store_score():
#     score = int(request.form["score"])
#     # here insert the score into the database
#     # if update is successful, return success, torhwrwise return failure
#     return "success"