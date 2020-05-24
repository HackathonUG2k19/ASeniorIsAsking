from flask import Blueprint, request, jsonify

import backend.src.model as model
import json

api_bp = Blueprint('api_bp', __name__)


@api_bp.route("/order_request", methods=["POST"])
def order_request():
    if request.is_json:
        # request.get_json() returns a converted dict
        incoming_dict = request.get_json()
        if model._redis.is_orderer_json_valid(incoming_dict) is False:
            return_dict = {
                "message": "Invalid JSON."
            }
            return jsonify(return_dict), 400
        else:
            latest_order_id = model._redis.pending_order_add(incoming_dict)
            return_dict = {
                "order_id": str(latest_order_id)
            }
            return jsonify(return_dict), 200

    else:
        return_dict = {
            "message": "JSON not received."
        }
        return jsonify(return_dict), 400


@api_bp.route("/pending_orders_list", methods=["GET"])
def pending_orders():
    # receives a python dictionary of the jsons that were stored.
    # so convert it to a json of jsons and then send it.
    pending_order_dict = model._redis.get_all_pending()
    return jsonify(pending_order_dict), 200


@api_bp.route("/accepted_orders", methods=["GET"])
def accepted_orders():
    # receives a python dictionary of the jsons that were stored.
    # so convert it to a json of jsons and then send it.
    accepted_orders_dict = model._redis.get_all_done()
    return json.dumps(accepted_orders_dict)


@api_bp.route("/accept_order", methods=["POST"])
def accept_order():
    if request.is_json:
        accepter_dict = request.get_json()

        if model._redis.is_acceptor_json_valid(accepter_dict) is False:
            return_dict = {
                "message": "Invalid JSON."
            }
            return json.dumps(return_dict), 400

        order_id = accepter_dict["order_id"]
        if model._redis.has_it_been_accepted(order_id):
            return_dict = {
                "message": "The order has already been accepted by someone else."
            }
            return json.dumps(return_dict), 203
        else:
            model._redis.accept_order(order_id, accepter_dict)
            return_dict = {
                "message": "You have accepted the order."
            }
            return json.dumps(return_dict), 200

    else:
        return_dict = {
            "message": "JSON not received."
        }
        return json.dumps(return_dict), 400


@api_bp.route("/delete_order/<order_id>", methods=["GET"])
def delete_order(order_id):
    if model._redis.valid_order(order_id):
        if model._redis.has_it_been_accepted(order_id):
            return_dict = {
                "message": "Your order has already been accepted."
            }
            return json.dumps(return_dict), 400
        else:
            if(model._redis.delete_order(order_id)):
                return_dict = {
                    "message": "Your order has been deleted successfully."
                }
                return json.dumps(return_dict), 200
            else:
                return_dict = {
                    "message": "An error occurred while deleting your order."
                }
                return json.dumps(return_dict), 203
    else:
        return_dict = {
            "message": "Invalid Order ID."
        }
        return json.dumps(return_dict), 404


@api_bp.route("/view_order/<order_id>", methods=["GET"])
def view_order(order_id):
    if model._redis.valid_order(order_id):
        if model._redis.has_it_been_accepted(order_id):
            return json.dumps(model._redis.get_particular_done(order_id)), 200
        else:
            return json.dumps(model._redis.get_particular_pending(order_id)), 200

        return_dict = {
            "message": "Invalid Order ID."
        }
        return json.dumps(return_dict), 404


@api_bp.route("/edit_order/<order_id>", methods=["GET", "POST"])
def edit_order(order_id):
    if model._redis.valid_order(order_id):
        if model._redis.has_it_been_accepted(order_id):
            return_dict = {
                "message": "Your order has already been accpeted."
            }
            return json.dumps(return_dict), 400
        else:
            if request.is_json:
                incoming_dict = request.get_json()
                if model._redis.is_orderer_json_valid(incoming_dict) is False:
                    return_dict = {
                        "message": "Invalid JSON."
                    }
                    return json.dumps(return_dict), 400
                else:
                    if(model._redis.edit_order(order_id, incoming_dict)):
                        return_dict = {
                            "message": "Your order has been updated successfully."
                        }
                        return json.dumps(return_dict), 200
                    else:
                        return_dict = {
                            "message": "There was an error updating your order."
                        }
                        return json.dumps(return_dict), 203

            else:
                return_dict = {
                    "message": "JSON not received."
                }
                return json.dumps(return_dict), 400
    else:
        return_dict = {
            "message": "Invalid Order ID."
        }
        return json.dumps(return_dict), 404
