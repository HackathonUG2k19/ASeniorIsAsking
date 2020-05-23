from flask import Blueprint
from flask import request

import backend.src.model as model
import json

api_bp = Blueprint('api_bp', __name__)


@api_bp.route("/")
def index():
    model._redis.inc_count()
    count = model._redis.get_count()
    return "This page has been visited {} times".format(count)


@api_bp.route("/order_request", methods=["POST"])
def order_request():

    test_dict = {
        "key_example": "value_example"
    }

    latest_order_id = model._redis.pending_order_add(json.dumps(test_dict))
    return_dict = {
        "order_id": latest_order_id
    }
    return json.dumps(return_dict), 200

    if request.is_json:
        incoming_json = request.get_json()
        latest_order_id = model._redis.pending_order_add(incoming_json)
        return latest_order_id
    else:
        return_dict = {
            "message": "JSON not received."
        }
        return json.dumps(return_dict), 400


@api_bp.route("/pending_orders_list", methods=["GET"])
def pending_orders():
    pending_order_dict = model._redis.get_all_pending()
    return json.dumps(pending_order_dict)


@api_bp.route("/accepted_orders", methods=["GET"])
def accepted_orders():
    accepted_orders_dict = model._redis.get_all_done()
    return json.dumps(accepted_orders_dict)


@api_bp.route("/accepted_orders/<order_id>", methods=["GET"])
def particular_order(order_id):
    if model._redis.valid_order(order_id) is False:
        return_dict = {
            "message": "Invalid Order ID."
        }
        return json.dumps(return_dict), 404
    elif model._redis.has_it_been_accepted(order_id):
        accepted_json = model._redis.get_particular_done(order_id)
        return accepted_json, 200
    else:
        return_dict = {
            "message": "Your order is still pending."
        }
        return json.dumps(return_dict), 200


@api_bp.route("/accept_order", methods=["POST"])
def accept_order():
    if request.is_json:
        accepter_dict = request.get_json()
        order_id = accepter_dict["order_id"]
        if model._redis.has_it_been_accepted(order_id):
            return_dict = {
                "message": "The order has already been accepted by someone else."
            }
            return json.dumps(return_dict), 203
        else:
            model._redis.accept_order(order_id, json.dumps(accepter_dict))
            return_dict = {
                "message": "You have accepted the order."
            }
            return json.dumps(return_dict), 200

    else:
        return_dict = {
            "message": "JSON not received."
        }
        return json.dumps(return_dict), 400
