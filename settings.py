import os
import plaid
from dotenv import load_dotenv

# Load .env file and save data to corresponding variables
load_dotenv()
PLAID_CLIENT_ID = os.getenv("PLAID_CLIENT_ID")
PLAID_SECRET = os.getenv("PLAID_SECRET")
PLAID_PUBLIC_KEY = os.getenv("PLAID_PUBLIC_KEY")
PLAID_ENV = os.getenv("PLAID_ENV")
PLAID_PRODUCTS = os.getenv("PLAID_PRODUCTS")
PLAID_COUNTRY_CODES = os.getenv("PLAID_COUNTRY_CODES")
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")
API_VERSION = os.getenv("API_VERSION")

# Initialize plaid client
client = plaid.Client(
    client_id=PLAID_CLIENT_ID,
    secret=PLAID_SECRET,
    public_key=PLAID_PUBLIC_KEY,
    environment=PLAID_ENV,
    api_version=API_VERSION,
)
