import redis
import json

import backend.src.config as config


class RedisConnection():
    def __init__(self):
        self.conn = redis.Redis(host=config.REDIS_HOST,
                                port=config.REDIS_PORT, charset="utf-8", decode_responses=True)
        self.conn.incr("number_of_orders", amount=0)

    def inc_count(self):
        self.conn.incr('count', amount=1)

    def get_count(self):
        return self.conn.get('count')

    def valid_order(self, order_id):
        try:
            num = int(order_id)
        except ValueError:
            return False
        return (num <= int(self.conn.get("number_of_orders")) and num >= 1)

    def pending_order_add(self, incoming_dict):
        self.conn.incr("number_of_orders", amount=1)
        latest_order_id = self.conn.get("number_of_orders")
        incoming_json = json.dumps(incoming_dict)
        self.conn.hset("pending_orders", key=latest_order_id,
                       value=incoming_json)
        return latest_order_id

    def get_particular_pending(self, order_id):
        # we have stored a json but we have to return a dict during communication
        stored_json = self.conn.hget("pending_orders", order_id)
        return json.loads(stored_json)

    def get_all_pending(self):
        # returns a python dictionary of the jsons that we stored.
        return self.conn.hgetall("pending_orders")

    def get_particular_done(self, order_id):
        # we have stored a json but we have to return a dict during communication
        stored_json = self.conn.hget("accepted_orders", order_id)
        return json.loads(stored_json)

    def get_all_done(self):
        # returns a python dictionary of the jsons that we stored.
        return self.conn.hgetall("accepted_orders")

    def has_it_been_accepted(self, order_id):
        if(self.conn.hget("accepted_orders", order_id)):
            return True
        else:
            return False

    def accept_order(self, order_id, accepter_dict):
        orderer_json = self.conn.hget("pending_orders", order_id)
        orderer_dict = json.loads(orderer_json)

        merged_dict = orderer_dict.copy()
        merged_dict.update(accepter_dict)
        merged_json = json.dumps(merged_dict)
        self.conn.hset("accepted_orders", key=order_id, value=merged_json)
        self.conn.hdel("pending_orders", order_id)


    def is_orderer_json_valid(self, incoming_dict):
        print("got till here")
        required_keys = ["name", "Items", "contact"]
        for key in required_keys:
            if key not in incoming_dict:
                return False
        if len(incoming_dict["Items"]) <= 0:
            return False
        return True
    def is_acceptor_json_valid(self, incoming_dict):
        required_keys = ["acceptor_name", "acceptor_contact", "order_id"]
        for key in required_keys:
            if key not in incoming_dict:
                return False
        return True

    def delete_order(self, order_id):
        return self.conn.hdel("pending_orders", order_id)

    def edit_order(self, order_id, updated_json):
        if(self.conn.hdel("pending_orders", order_id)):
            return self.conn.hset("pending_orders", key=order_id, value=updated_json)
        else:
            return False

          
_redis = None


def init_redis_connection():
    global _redis
    _redis = RedisConnection()
    return _redis
