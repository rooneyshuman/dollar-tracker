import os
from flask import Flask
from flask.views import MethodView
from index import Index
from sassutils.wsgi import SassMiddleware
import sass
app = Flask(__name__)
app.secret_key == os.urandom(24)
app.add_url_rule("/", view_func=Index.as_view("index"), methods=["GET"])
app.wsgi_app = SassMiddleware(app.wsgi_app, {__name__: ('static/sass', 'static/stylesheets', 'static/stylesheets')})

if __name__ == "__main__":
    # sass.compile(dirname=('static/sass', 'static/stylesheets'), source_comments=True)
    app.run(debug=True)

