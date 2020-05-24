from flask import Flask
from flask_cors import CORS

import backend.src.model as model
import backend.src.views as views


def create_app(debug=True):
    model.init_redis_connection()
    app = Flask(__name__)
    app.register_blueprint(views.api_bp)
    if debug:
        app.config['DEBUG'] = True
        app.config['ENV'] = "development"

    return app


if __name__ == "__main__":
    app = create_app()
    CORS(app)
    app.run(host="0.0.0.0")
