import os
from flask import Flask, render_template
from flask.views import MethodView
from index import Index
from portfolio import Portfolio
from sassutils.wsgi import SassMiddleware


app = Flask(__name__)
app.secret_key == os.urandom(24)
app.wsgi_app = SassMiddleware(
    app.wsgi_app,
    {__name__: ("static/sass", "static/stylesheets", "static/stylesheets")},
)

app.add_url_rule("/", view_func=Index.as_view("index"), methods=["GET"])
app.add_url_rule("/portfolio", view_func=Portfolio.as_view("portfolio"), methods=["GET"])
# @app.route("/portfolio")
# def portfolio():
#     return render_template('portfolio.html')

if __name__ == "__main__":
    app.run(debug=True)
