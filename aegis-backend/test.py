import requests
import json

response = requests.get('http://localhost:3003/get_transactions').json()

print(response)
