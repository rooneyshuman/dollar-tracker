from flask import render_template
from flask.views import MethodView
from iexfinance.stocks import Stock
from settings import *
import pandas as pd

IEX_KEY = "pk_2d3798cff29b4669a4b6a4b0b41b2cf2"


class Portfolio(MethodView):

    def get(self):
        prices = self.get_ohlc_date('TSLA')
        return render_template("portfolio.html", page_name="Portfolio", prices=prices)

    def get_ohlc_date(self, symbol, timeframe='1y'):
        stock = Stock(symbol, token=IEX_KEY)
        return stock.get_historical_prices(range=timeframe)
