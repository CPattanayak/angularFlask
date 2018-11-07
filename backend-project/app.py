from flask import Flask, jsonify, request,send_from_directory,send_file
from flask_cors import CORS
from pymongo import MongoClient
from io import BytesIO
from PIL import Image

import gridfs
import os
from werkzeug.utils import secure_filename


dir = './upload'
app = Flask(__name__)
CORS(app)
mongourl = os.getenv("MONGO-URL", "mongodb://localhost:27017")
client = MongoClient(mongourl)
db = client.customerapp

db1 = client.imageapp
test_col = db1.test
fs = gridfs.GridFS(db1)

custDetail = db["customer"]
itemDetail = db1["itemdetail"]

@app.route("/api/item", methods=['POST'])
def create_item():
    request_data = request.get_json()
    itemDetail.insert_one(
        {'itemName': request_data['itemName'], 'price': request_data['price'], 'avalibility': request_data['avalibility'],
         'imageName': request_data['imageName']})
    return jsonify({'status': 'Success'})

@app.route("/api/items")
def get_items():
    return_items = []
    inner_items = []
    counter = 0
    for item in itemDetail.find():
        inner_items.append({'itemName': item['itemName'],
                            'price': item['price'], 'avalibility': item['avalibility'],
                            'imageName': item['imageName']})
        counter = counter + 1
        if counter % 3 == 0 :
            return_items.append(inner_items)
            inner_items.clear()
    if len(inner_items)  > 0:
        return_items.append(inner_items)
    return jsonify({'items': return_items})

@app.route("/api/uploaddb", methods=['POST', 'OPTIONS'])
def do_upload():
    if request.method == 'POST':
        file = request.files['photo']
        filename = secure_filename(file.filename)

        newfile_id = fs.put(file.read(), filename=filename,contentType='image/jpeg')
    return jsonify({'status': 'Success'})


@app.route('/image/<path:filename>')
def get_image(filename):

    if not fs.exists(filename=filename):
        raise Exception("mongo file does not exist! {0}".format(filename))

    im_stream = fs.get_last_version(filename)
    im = Image.open(im_stream)
    return serve_pil_image(im)


def serve_pil_image(pil_img):

    img_io = BytesIO()
    pil_img.save(img_io, 'JPEG', quality=70)
    img_io.seek(0)
    return send_file(img_io, mimetype='image/jpeg')

@app.route("/api/upload", methods=['POST', 'OPTIONS'])
def loadFile():
    if request.method == 'POST':
        file = request.files['photo']
        filename = secure_filename(file.filename)
        file.save(os.path.join(dir, filename))
    return jsonify({'status': 'Success'})
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(dir,
                               filename)
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

app.run(port=5000, host='0.0.0.0',debug=True)
