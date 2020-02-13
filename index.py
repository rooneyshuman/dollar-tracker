from flask import render_template
from flask.views import MethodView
from settings import *
PLAID_CLIENT_ID = "5df885c6e118630015ea6afa"
PLAID_SECRET = "780318974bd704a7f9d978218c5082"
PLAID_PUBLIC_KEY = "c37682766513f5832f7acfe6e6babd"
PLAID_ENV = "sandbox"
PLAID_PRODUCTS = "transactions"
PLAID_COUNTRY_CODES = "US,CA,GB,FR,ES"
ACCESS_TOKEN = "access-sandbox-52b973b6-3c7e-4a21-8ee3-19bd6f3e681a"
API_VERSION = "2019-05-29"

# Initialize plaid client
client = plaid.Client(
    client_id=PLAID_CLIENT_ID,
    secret=PLAID_SECRET,
    public_key=PLAID_PUBLIC_KEY,
    environment=PLAID_ENV,
    api_version=API_VERSION,
)


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
                type=raw_acct["type"],
            )
            for raw_acct in raw_acct_data["accounts"]
        ]

        return accounts
