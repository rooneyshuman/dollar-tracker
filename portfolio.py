from flask import render_template
from flask.views import MethodView


class Portfolio(MethodView):

    def get(self):
        config = {'symbols': ['PTON'], 'ranges': ['3m']}
        return render_template("portfolio.html", page_name="Portfolio", config=config)
