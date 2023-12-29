from pathlib import Path
from io import BytesIO

file_path = Path("data.csv")

if (not file_path.is_file()):
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
