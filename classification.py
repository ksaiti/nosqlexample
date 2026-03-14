import pandas as pd
import numpy as np
from pymongo import MongoClient

# connect to MongoDBAtlas

#start with the connection to cluster inside the mongoDB Atlas (cluster0)
client = MongoClient("mongodb://student:JaAyKYU08pSgEclE@ac-kx3nehd-shard-00-00.4cbmak8.mongodb.net:27017,ac-kx3nehd-shard-00-01.4cbmak8.mongodb.net:27017,ac-kx3nehd-shard-00-02.4cbmak8.mongodb.net:27017/?ssl=true&replicaSet=atlas-131pek-shard-0&authSource=admin&appName=Cluster0")

# select the database
db = client['analytics'] #database
collection = db["clickstream"] # inside the database

#retrieve documents 
data = list(collection.find())

df = pd.DataFrame(data)

#print(df.head())

# overview of descriptive statistics

print(df.describe())

# check data types

print(df.info())
