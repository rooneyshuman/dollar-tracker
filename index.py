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
        Returns list of dictionaries containing account the following data: 
            name, balance, account_id, type, account_no, routing_no
        :return: list of retrieved accounts
        """

        # Retrive raw account data through Plaid's "Auth" endpoint
        raw_acct_data = client.Auth.get(ACCESS_TOKEN)

        # Create dictionary with accounts' information
        accounts = [
            dict(
                name=raw_acct["name"],
                balance=raw_acct["balances"]["current"],
                id=raw_acct["account_id"],
                type=raw_acct["subtype"],
            )
            for raw_acct in raw_acct_data["accounts"]
        ]

        # Retrieve account and routing numbers using ACH fields (US standard)
        if len(raw_acct_data["numbers"]["ach"]) > 0:
            for acct in accounts:
                acct_no = list(
                    filter(
                        lambda ach_nums: ach_nums["account_id"] == acct["id"],
                        raw_acct_data["numbers"]["ach"],
                    )
                )
                acct["account_no"] = acct_no[0]["account"] if len(acct_no) > 0 else ""
                acct["routing_no"] = acct_no[0]["routing"] if len(acct_no) > 0 else ""

        return accounts
