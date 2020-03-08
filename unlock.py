from flask import render_template
from flask.views import MethodView


class Unlock(MethodView):
    def get(self):
        """
        GET method for unlock page.
        :return: renders the reset.html page on return
        """
        return render_template(
            "unlock.html",
            page_name="Resend Unlock Email"
        )

