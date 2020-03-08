from flask import render_template
from flask.views import MethodView


class Reset(MethodView):
    def get(self):
        """
        GET method for reset page.
        :return: renders the reset.html page on return
        """
        return render_template(
            "reset.html",
            page_name="Reset Password"
        )

