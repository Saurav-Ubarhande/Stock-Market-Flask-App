from flask import Flask, send_file, request, jsonify
from pprint import pprint
import os
import finnhub
import requests
from dateutil.relativedelta import relativedelta
from datetime import date, datetime, timedelta
app = Flask(__name__)

@app.route("/")
def index():
    return send_file('index.html',mimetype='text/html')

@app.route('/process1', methods=['GET'])
def process1():
    data_from_js = request.args.get('data')
    data_from_js= data_from_js.upper()
    finnhub_url1 = f'https://finnhub.io/api/v1/stock/profile2?symbol={data_from_js}&token=cmu2ja9r01qsv99lvmdgcmu2ja9r01qsv99lvme0'
    try:
        data1 = requests.get(finnhub_url1).json()

        return jsonify(data1)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/process2', methods=['GET'])
def process2():
    data_from_js = request.args.get('data')
    data_from_js= data_from_js.upper()
    finnhub_url2 = f'https://finnhub.io/api/v1/quote?symbol={data_from_js}&token=cmu2ja9r01qsv99lvmdgcmu2ja9r01qsv99lvme0'

    
    try:
        data2 = requests.get(finnhub_url2).json()

        return jsonify(data2)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
  
@app.route('/process3', methods=['GET'])
def process3():
    data_from_js = request.args.get('data')
    data_from_js= data_from_js.upper()

    finnhub_url3 = f'https://finnhub.io/api/v1/stock/recommendation?symbol={data_from_js}&token=cmu2ja9r01qsv99lvmdgcmu2ja9r01qsv99lvme0'

    try:
        data3 = requests.get(finnhub_url3).json()

        return jsonify(data3)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/process4', methods=['GET'])
def process4():
    data_from_js = request.args.get('data')
    data_from_js= data_from_js.upper()

    today=date.today()
    m_ago=6
    d_ago=1
    prior_data=today-relativedelta(months=m_ago, days=d_ago)
    old=prior_data.strftime('%Y-%m-%d')

    polygon_url=f'https://api.polygon.io/v2/aggs/ticker/{data_from_js}/range/1/day/{old}/{today}?adjusted=true&sort=asc&apiKey=eH2puz4LUAnC5KoMpQ8DGplIXEKbvX38'
    try:
        data4 = requests.get(polygon_url).json()

        return jsonify(data4)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/process5', methods=['GET'])
def process5():
    data_from_js = request.args.get('data')
    data_from_js= data_from_js.upper()
    
    t = date.today()
    d_ago = 30
    date_30 = t - relativedelta(days=d_ago)
    p_date = date_30.strftime('%Y-%m-%d')
    
    finnhub_url5 = f'https://finnhub.io/api/v1/company-news?symbol={data_from_js}&from={p_date}&to={t}&token=cmu2ja9r01qsv99lvmdgcmu2ja9r01qsv99lvme0'
    
    try:
        data5 = requests.get(finnhub_url5).json()

        return jsonify(data5)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == "__main__":
    app.run(debug=True)
