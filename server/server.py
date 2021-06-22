from flask import Flask
import yfinance as yf
from flask import jsonify
import pandas
import numpy as np
import requests
import json
import pandas as pd


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


#------------------------------------------------------------------------------
@app.route("/onClick", methods=['GET', 'POST'])
def onClick():
    #currency = request.args.get('currency')
    #tf = request.args.get('tf')
    currency = "AUDUSD"
    tf = "1d"
    print(currency)
    print(tf)
    df = getData(currency, tf)
    df = df.to_dict(orient="records")
    return jsonify(result = df)

def oanda(currency, tf):
    print("Oanda")
    first = currency[0:len(currency)//2]
    second = currency[len(currency)//2 if len(currency)%2 == 0
    else ((len(currency)//2)+1):]
    currency = first + "_" + second 
    BASE_URL = 'https://api-fxpractice.oanda.com/v3/instruments/'+currency+'/candles?price=M&from=2020-01-01&granularity=D'
    token = '10b50bff6f17e7f36a0356b9dd199ee1-2b88fb8c7fe8b1ca46ab6b621f434c04'
    headers = {'Authorization': "Bearer {}".format(token)}
    auth_response = requests.get(BASE_URL, headers=headers)
    x = json.loads(auth_response.text)

    arr = []
    arrTwo = []
    for i in x['candles']:
        arr.append(i['time'])
        p=0
        for c in i['mid']:
            if p == 0:
                arr.append(i['mid']['o'])
                p+=1
            elif p == 1:
                arr.append(i['mid']['h'])
                p+=1
            elif p == 2:
                arr.append(i['mid']['l'])
                p+=1
            else:
                arr.append(i['mid']['c'])
                p = 0
        arrTwo.append(arr)
        arr = []
    df = pd.DataFrame(arrTwo)
    df.columns=["time", "open", "high", "low", "close"]
    print(df['time'])
    df['time']= df['time'].astype(str)
    df['time'] = df.time.str.split('T', expand=True)
    df['date'] = pd.to_datetime(df['time'], format = '%Y-%m-%d')
    print(df['date'])
    df['date'] = (df['date'] -pd.Timestamp("1970-01-01"))// pd.Timedelta("1s")
    print(df['date'])
    df.columns=["time", "open", "high", "low", "close", "date"]
    df[["open", "high", "low", "close"]]=df[["open", "high", "low", "close"]].apply(pd.to_numeric)
    return df

#-------------------------------------------------------------
def getData(currency, tf):
     # 1m,2m,5m,15m,30m,60m,90m,1h,1d,5d,1wk,1mo,3mo
    fxList = ["EURUSD", "GBPUSD", "USDJPY", "AUDUSD", "NZDUSD"]
    metalsList = ["QM", "GC", ]#=F
    indicesList = ["TNX", "SPX", "TYX", "NYA", "NDX", "RUT"]#^^^^^^^^^
    if ((tf == "1d") and (currency in fxList)): 
        df = oanda(currency, tf)
    else:
        if currency in metalsList:
            currency = currency+"=F"
        if currency in indicesList:
            currency = "^"+currency
        if currency in fxList:
            currency = currency+"=X"
        df = yfinance(currency, tf)
    return df
