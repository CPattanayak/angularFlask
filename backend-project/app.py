from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from pymongo import MongoClient
import os

app = Flask(__name__)
CORS(app)
mongourl = os.getenv("MONGO-URL", "mongodb://localhost:27017")
client = MongoClient(mongourl)
db = client.customerapp

custDetail = db["customer"]


@app.route("/create", methods=['POST'])
def postcustomer():
    request_data = request.get_json()
    custDetail.insert_one(
        {'firstName': request_data['firstName'], 'lastName': request_data['lastName'], 'email': request_data['email'],
         'mobile': request_data['mobile']})
    return jsonify({'status': 'Success'})


@app.route("/list/<int:page>")
def customerlist(page):
    returnList = []
    page_size = 10
    page_num = page
    skips = page_size * (page_num - 1)
    totalcount = custDetail.count()
    for customer in custDetail.find().skip(skips).limit(page_size):
        returnList.append(
            {'firstName': customer['firstName'], 'lastName': customer['lastName'], 'email': customer['email'],
             'mobile': customer['mobile']})
    return jsonify({'current': page_num,
                    'rowCount': page_size,
                    'rows': returnList, 'total': totalcount})


@app.route("/delete/<int:mobile>", methods=['DELETE'])
def deleteCustomer(mobile):
    deletemap = {'mobile': mobile}
    x = custDetail.delete_many(deletemap)
    print(x.deleted_count, " documents deleted.")
    return jsonify({'result': 'Success'})

@app.route("/update/<int:mobile>",methods=['PUT'])
def updateCustomer(mobile):
    deletemap = {'mobile': mobile}
    x = custDetail.delete_many(deletemap)
    request_data = request.get_json()
    custDetail.insert_one(
        {'firstName': request_data['firstName'], 'lastName': request_data['lastName'], 'email': request_data['email'],
         'mobile': request_data['mobile']})
    return jsonify({'status': 'Success'})

app.run(port=5000, debug=True)
