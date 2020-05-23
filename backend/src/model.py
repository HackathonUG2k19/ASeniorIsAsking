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

    def pending_order_add(self, incoming_json):
        self.conn.incr("number_of_orders", amount=1)
        latest_order_id = self.conn.get("number_of_orders")
        self.conn.hset("pending_orders", key=latest_order_id,
                       value=incoming_json)
        return latest_order_id

    def get_particular_pending(self, order_id):
        return self.conn.hget("pending_orders", order_id)

    def get_all_pending(self):
        return self.conn.hgetall("pending_orders")

    def get_particular_done(self, order_id):
        return self.conn.hget("accepted_orders", order_id)

    def get_all_done(self):
        return self.conn.hgetall("accepted_orders")

    def has_it_been_accepted(self, order_id):
        if(self.conn.hget("accepted_orders", order_id)):
            return True
        else:
            return False

    def accept_order(self, order_id, accepter_json):
        orderer_json = self.conn.hget("pending_orders", order_id)
        dict_a = json.loads(orderer_json)
        dict_b = json.loads(accepter_json)
        merged_dict = dict_a.copy()
        merged_dict.update(dict_b)
        merged_json = json.dumps(merged_dict)
        self.conn.hset("accepted_orders", key=order_id, value=merged_json)
        self.conn.hdel("pending_orders", order_id)


_redis = None


def init_redis_connection():
    global _redis
    _redis = RedisConnection()
    return _redis
