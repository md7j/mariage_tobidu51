from csv_storage import CSVStorage

class UserData:
    def __init__(self, name: str, adress: str, chorale: str, instrument: str):
        self.name = name
        self.adress = adress
        self.chorale = chorale
        self.instrument = instrument

    def save(self):
        CSVStorage.add(self.name, self.adress, self.chorale, self.instrument)
