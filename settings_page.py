from flask import render_template
from flask.views import MethodView


class SettingsPage(MethodView):
    def get(self):
        """
        GET method for settings page.
        :return: renders the settings.html page on return
        """
        return render_template(
            "settings.html",
            page_name="Settings"
        )

