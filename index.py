from flask import render_template
from flask.views import MethodView
from settings import *


class Index(MethodView):
    def get(self):
        """
        GET method for index page. Calls get_account_data() to retrieve accounts.
        :return: renders the index.html page on return
        """
        accounts = self.get_account_data()
        return render_template("index.html", page_name="Main", accounts=accounts)

    def get_account_data(self):
        """
        Returns list of dictionaries containing account the following data: name, balance, type
        :return: list of retrieved accounts
        """

        # Retrive raw account data through Plaid's "Accounts" endpoint
        raw_acct_data = client.Accounts.get(ACCESS_TOKEN)

        # Create dictionary with accounts' information
        accounts = [
            dict(
                name=raw_acct["name"],
                balance=raw_acct["balances"]["current"],
                type=raw_acct["type"],
            )
            for raw_acct in raw_acct_data["accounts"]
        ]

        return accounts
