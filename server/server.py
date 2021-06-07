from flask import Flask
import yfinance as yf
from flask import jsonify
import pandas
import numpy as np


app = Flask(__name__)

@app.route("/test")
def test():
      return {"id":"adam"}

@app.route("/onLoad")
def index():
      currency = "EURUSD=X"
      tf = "1h"
      df = yfinance(currency, tf)
      df = df.to_dict(orient="records")
      return jsonify(result = df)
 

def yfinance(currency, tf):
    print("yfinance")
    print(currency)
    if tf == "1d":
        lengthHour = "2y"
    elif tf == "1wk":
        lengthHour = "5y"
    elif tf == "1mo":
        lengthHour = "10y"
    else:
        lengthHour = "1mo"
    currency = yf.Ticker(currency)
    df = currency.history(period=lengthHour, interval=tf)  
    df = df.rename(columns={"Open": "open", "High": "high", "Low": "low", "Close": "close"})
    df['date']=df.index.astype(np.int64)//10**9
    df = df[["date", "open", "high", "low", "close"]]
    return df