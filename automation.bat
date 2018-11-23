npm install -g newman
newman run automation/itemtest.json -d automation/itmdata.csv
newman run automation/PhotoUploader.json -d automation/photodata.csv