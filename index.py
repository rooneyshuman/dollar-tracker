from flask import render_template
from flask.views import MethodView
from settings import *
import datetime


class Index(MethodView):
    def get(self):
        """
        GET method for index page. Calls get_account_data() to retrieve accounts.
        :return: renders the index.html page on return
        """
        accounts = self.get_account_data()
        transactions = self.get_transaction_data()
        return render_template(
            "index.html", page_name="Main", accounts=accounts, transactions=transactions
        )

    def get_account_data(self):
        """
        Returns list of dictionaries containing the following account data: name, balance, type
        :return: list of retrieved accounts
        """

        # Retrive raw account data through Plaid's "Accounts" endpoint
        raw_acct_data = client.Accounts.get(ACCESS_TOKEN)

        # Create dictionary with accounts' information
        accounts = [
            dict(
                name=raw_acct["name"],
                balance=raw_acct["balances"]["current"],
                subtype=raw_acct["subtype"],
                type=raw_acct["type"],
            )
            for raw_acct in raw_acct_data["accounts"]
        ]

        return accounts

    def get_transaction_data(self):
        """
        Returns list of dictionaries containing the following transaction data: name, amount, category, date
        :return: list of retrieved transactions
        """

        # Retrive raw account data through Plaid's "Accounts" endpoint
        # Pull transactions for the last 30 days
        start_date = "{:%Y-%m-%d}".format(
            datetime.datetime.now() + datetime.timedelta(-30)
        )
        end_date = "{:%Y-%m-%d}".format(datetime.datetime.now())
        transactions_response = client.Transactions.get(
            ACCESS_TOKEN, start_date, end_date
        )

        # Create dictionary with transactions' information
        transactions = [
            dict(
                amount=transaction["amount"],
                name=transaction["name"],
                date=transaction["date"],
                category=transaction["category"][0],
            )
            for transaction in transactions_response["transactions"]
        ]

        return transactions
