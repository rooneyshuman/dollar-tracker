import os
from flask import Flask
from flask.views import MethodView
from index import Index
from sassutils.wsgi import SassMiddleware
from dotenv import load_dotenv


app = Flask(__name__)
app.secret_key == os.urandom(24)
app.wsgi_app = SassMiddleware(
    app.wsgi_app,
    {__name__: ("static/sass", "static/stylesheets", "static/stylesheets")},
)

# Load .env file and save data to corresponding variables
load_dotenv()
PLAID_CLIENT_ID = os.getenv("PLAID_CLIENT_ID")
PLAID_SECRET = os.getenv("PLAID_SECRET")
PLAID_PUBLIC_KEY = os.getenv("PLAID_PUBLIC_KEY")
PLAID_ENV = os.getenv("PLAID_ENV")
PLAID_PRODUCTS = os.getenv("PLAID_PRODUCTS")
PLAID_COUNTRY_CODES = os.getenv("PLAID_COUNTRY_CODES")
PLAID_OAUTH_REDIRECT_URI = os.getenv("PLAID_OAUTH_REDIRECT_URI", "")
PLAID_OAUTH_NONCE = os.getenv("PLAID_OAUTH_NONCE", "")

# Initialize plaid client
client = plaid.Client(
    client_id=PLAID_CLIENT_ID,
    secret=PLAID_SECRET,
    public_key=PLAID_PUBLIC_KEY,
    environment=PLAID_ENV,
    api_version="2019-05-29",
)

app.add_url_rule("/", view_func=Index.as_view("index"), methods=["GET"])

if __name__ == "__main__":
    app.run(debug=True)
