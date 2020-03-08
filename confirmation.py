from flask import render_template
from flask.views import MethodView


class Confirmation(MethodView):
    def get(self):
        """
        GET method for confirmation page.
        :return: renders the confirmation.html page on return
        """
        return render_template(
            "confirmation.html",
            page_name="Resend Confirmation"
        )

