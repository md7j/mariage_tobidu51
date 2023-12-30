from flask import Flask, request, Response, redirect
from flask_cors import CORS
from os import getenv
from typing import Any, Union
import requests

class APIResponseError(ValueError):
    pass

def handle_response_errors(response: requests.Response) -> requests.Response:
    if str(response.status_code) == "200":
        return response
    raise APIResponseError(f"Oops, something went wrong: {response.json()}")

class BlobHandler:
    def __init__(self) -> None:
        self.vercel_api_url = "https://blob.vercel-storage.com"
        self.api_version = "4"
        self.token = getenv("BLOB_READ_WRITE_TOKEN")

    def put(self, pathname: str, body: bytes) -> dict:
        headers = {
            "access": "public",
            "authorization": f"Bearer {self.token}",
            "x-api-version": self.api_version,
            "x-content-type": "text/csv",
            "x-cache-control-max-age": str(365 * 24 * 60 * 60),
        }
        _resp = requests.put(
            f"{self.vercel_api_url}/{pathname}", data=body, headers=headers
        )
        return handle_response_errors(_resp).json()

    def delete(self, url: Union[str, list[str], tuple[str]]) -> dict:
        headers = {
            "authorization": f"Bearer {self.token}",
            "x-api-version": self.api_version,
            "content-type": "application/json",
        }
        _resp = requests.post(
            f"{self.vercel_api_url}/delete",
            json={
                "urls": [
                    url,
                ]
                if isinstance(url, str)
                else url
            },
            headers=headers,
        )
        return handle_response_errors(_resp).json()

    def list(self, prefix: str = None, cursor: str = None, mode: str = None) -> Any:
        headers = {
            "authorization": f"Bearer {self.token}",
            "limit": "1000",
        }
        if prefix:
            headers["prefix"] = prefix
        if cursor:
            headers["cursor"] = cursor
        if mode:
            headers["mode"] = mode
        _resp = requests.get(
            self.vercel_api_url,
            headers=headers,
        )
        return handle_response_errors(_resp).json()

blob_handler = BlobHandler()

class CSVStorage:
    @staticmethod
    def add(*args):
        url = CSVStorage.get_file()
        response = requests.get(url)
        data = handle_response_errors(response).text
        data += ",".join([f"\"{arg}\"" for arg in args]) + "\n"
        blob_handler.put("export_mariage.csv", bytes(data, 'utf-8'))

    @staticmethod
    def get_file():
        blobs = blob_handler.list()["blobs"]
        if not len(blobs):
            data = ",".join(["\"nom\"", "\"adresse\"", "\"chorale\"", "\"instrument\""])
            return blob_handler.put("export_mariage.csv", bytes(data, "utf-8"))["url"]
        return sorted(blobs, key=lambda d: d['uploadedAt'], reverse=True)[0]["url"]


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
    if not token or token != getenv(
        "REACT_APP_BACKEND_SECRET_TOKEN", "authorization_token"
    ):
        return False
    else:
        return True

app = Flask(__name__)
cors = CORS(app)

@app.route("/api", methods=["POST", "GET"])
def root():
    if request.method == "POST":
        if not has_valid_token(request.headers):
            return Response(None, 401)
        user_data = UserData(**request.json)
        user_data.save()
        return Response(None, 200)
    if request.method == "GET":
        # if not has_valid_token(request.headers):
        #     return Response(None, 401)
        return CSVStorage.get_file(), 200

# from flask import Flask

# app = Flask(__name__)

# @app.route("/api/python")
# def hello_world():
#     return "<p>Hello, World!</p>"

# from flask import Flask, Response

# app = Flask(__name__)

# @app.route("/", defaults={"path": ""})
# @app.route("/<path:path>")
# @app.route("/api")
# def hello_world():
#     return "<p>Hello, World!</p>", 200


# @app.route("/", defaults={"path": ""})
# def catch_all(path):
#     # Everything above this line should look the same for each 
#     # index.py. Modify lines below this to have different logic
#     # for different routes.
#     return Response(
#         "<h1>Flask</h1><p>You visited: /%s</p>" % (path), mimetype="text/html"
#     )
