import os
from flask import Flask
from index import Index
from portfolio import Portfolio
from settings_page import SettingsPage
from confirmation import Confirmation
from reset import Reset
from unlock import Unlock
from sassutils.wsgi import SassMiddleware


app = Flask(__name__)
app.secret_key == os.urandom(24)
app.wsgi_app = SassMiddleware(
    app.wsgi_app,
    {__name__: ("static/sass", "static/stylesheets", "static/stylesheets")},
)

app.add_url_rule("/", view_func=Index.as_view("index"), methods=["GET"])
app.add_url_rule(
    "/portfolio", view_func=Portfolio.as_view("portfolio"), methods=["GET"]
)
app.add_url_rule(
    "/settings", view_func=SettingsPage.as_view("settings"), methods=["GET"]
)
app.add_url_rule(
    "/confirmation", view_func=Confirmation.as_view("confirmation"), methods=["GET"]
)
app.add_url_rule(
    "/reset", view_func=Reset.as_view("reset"), methods=["GET"]
)
app.add_url_rule(
    "/unlock", view_func=Unlock.as_view("unlock"), methods=["GET"]
)
if __name__ == "__main__":
    app.run(debug=True)
