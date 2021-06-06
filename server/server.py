from flask import Flask, Response, request
import redis
from rq import Queue
import time


app = Flask(__name__)




@app.route("/home")
def index():
      print("hey")
      return "heyey"
 












if __name__ == '__main__':
    app.run()