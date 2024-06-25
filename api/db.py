
import os

import gridfs
from pymongo import MongoClient


def mongo_conn():
    try:
        conn = MongoClient('mongodb+srv://tech-challenge-admin:tech-challenge-ss24@techchallengecluster.vsppdlc.mongodb.net/?retryWrites=true&w=majority&appName=TechChallengeCluster')
        print("MongoDB Connected", conn)
        return conn.TechChallenge
    except Exception as err:
        print(f"Erorr in MongoDB connection: {err}")
        
        
def upload_file(file_loc, file_name, fs):
    with open(file_loc, 'rb') as file_data:
        data = file_data.read()
    fs.put(data, filename=file_name)
    print("Upload complete")

def download_file(download_loc, db, fs, file_name):
    data = db.proposalFiles.files.find_one({"filename": file_name})
    fs_id = data['_id']
    out_data = fs.get(fs_id).read()
    
    with open(download_loc, 'wb') as output:
        output.write(out_data)



if __name__ == '__main__':
    file_name = 'sample.pdf'
    file_loc = "/Users/niklasminth/Library/CloudStorage/GoogleDrive-niklas.minth@gmail.com/Meine Ablage/Macbook/Downloads/" + file_name
    down_loc = os.path.join(os.getcwd() + "/api/" + file_name)
    
    
    db = mongo_conn()
    fs = gridfs.GridFS(db, collection="proposalFiles")
    # upload_file(file_loc=file_loc, file_name=file_name, fs=fs)
    download_file(download_loc=down_loc, db=db, fs=fs, file_name=file_name)