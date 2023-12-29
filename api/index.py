from flask import Flask, request, Response, send_file
from flask_cors import CORS
import os
from pathlib import Path
from io import BytesIO

file_path = Path("data.csv")

if not file_path.is_file():
    with file_path.open("a") as file:
        file.write(",".join(["nom", "adresse", "chorale", "instrument"]) + "\n")


class CSVStorage:
    @staticmethod
    def add(*args):
        with file_path.open("a") as file:
            file.write(",".join(args) + "\n")

    @staticmethod
    def get_file():
        with file_path.open("r") as file:
            return BytesIO(file.buffer.read())

class UserData:
    def __init__(self, name: str, adress: str, chorale: str, instrument: str):
        self.name = name
        self.adress = adress
        self.chorale = chorale
        self.instrument = instrument

    def save(self):
        CSVStorage.add(self.name, self.adress, self.chorale, self.instrument)

def has_valid_token(headers):
    token = headers.get("authorization")
    if not token or token != os.environ.get(
        "AUTHORIZATION_TOKEN", "authorization_token"
    ):
        return False
    else:
        return True

app = Flask(__name__)
cors = CORS(app)

@app.route("/", methods=["POST", "GET"])
def root():
    if request.method == "POST":
        if not has_valid_token(request.headers):
            return Response(None, 401)
        user_data = UserData(**request.json)
        user_data.save()
        return Response(None, 200)
    if request.method == "GET":
        if not has_valid_token(request.headers):
            return Response(None, 401)
        return send_file(
            path_or_file=CSVStorage.get_file(),
            mimetype="text/csv",
            as_attachment=True,
            download_name="export_mariage.csv",
        )
