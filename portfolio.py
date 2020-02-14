from flask import render_template
from flask.views import MethodView


class Portfolio(MethodView):
    def get(self):
        """
        GET method for portfolio page. config dict contains stocks to chart
        :return: renders the portfolio.html page on return
        TODO maybe user can select these values?
        """
        config = {"symbols": ["PTON"], "ranges": ["3m"]}
        return render_template("portfolio.html", page_name="Portfolio", config=config)
