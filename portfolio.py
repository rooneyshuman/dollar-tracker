from flask import render_template
from flask.views import MethodView
import requests


class Portfolio(MethodView):
    def get(self):
        """
        GET method for portfolio page. config dict contains stocks to chart
        :return: renders the portfolio.html page on return
        TODO maybe user can select these values?
        """
        symbols = ["PTON", "FB"]
        ranges = ["3m", "3m"]
        sectors = ["Basic Materials", "Communication Services", "Consumer Cyclical", "Consumer Defensive", "Energy", "Financial Services"]
        allocations = [30, 10, 25, 25, 5, 5]
        config = {"symbols": symbols, "ranges": ranges, "sectors": sectors, "allocations": allocations}
        messages = self.getTwits()
        return render_template(
            "portfolio.html",
            page_name="Portfolio",
            config=config,
            config_len=len(symbols),
            messages=messages,
        )

    def getTwits(self):
        r = requests.get("https://api.stocktwits.com/api/2/streams/symbol/spy.json")
        if r.status_code == 200:
            data = r.json()
            return data["messages"]
        else:
            return {"error": r.status_code}
