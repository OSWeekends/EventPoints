# https://www.campus.co/api/campuses/ag1zfmd3ZWItY2FtcHVzciILEgZDYW1wdXMiBFJvb3QMCxIGQ2FtcHVzIgZtYWRyaWQM/events/?format=list&start=2017-01-23
import urllib.request
import json
import time

today = (time.strftime("%y/%m/%d")) #to know the actual date
today = today.replace(r"/", "-") # the r before "/" is for raw, and not scape

urlconsult = 'https://www.campus.co/api/campuses/ag1zfmd3ZWItY2FtcHVzciILEgZDYW1wdXMiBFJvb3QMCxIGQ2FtcHVzIgZtYWRyaWQM/events/?format=list&start=20' #/events/.... dejarlo igual el 20 es de 20-17

req = urllib.request.Request(urlconsult+today)
response = urllib.request.urlopen(req)
data = response.read()

data = data[6:] #scape the first 6 characters for the json standard
data = data.decode(encoding='UTF-8')
datajson = json.loads(data)

jsonfinal = []

for i in datajson["objects"]:

    if len(i["events"])>1: #if event exists

        for day in datajson["objects"]:
            details = {"source":{"name":"Campus Madrid"},"price":{"isFree":False,"details":"Unknown"},"location":{}} #creating the properties that has properties
            details["location"]["lat"]=40.41249699999999
            details["location"]["lon"]=-3.7182264000000487
            details["location"]["name"]="Campus Madrid"


            for event in day["events"]:
                details["date"] = event["eventData"]["local_start"]
                details["title"] = event["eventData"]["name"]
                details["target_url"] = event["eventData"]["url"]
                details["location"]["notes"] = event["eventData"]["location"]
                details["source"]["event_url"] = "https://www.campus.co/madrid/en/events/"+str(event["key"])
                details["source"]["url"] = "http://campus.co/madrid"
                details["source"]["logo"] = "http://tetuanvalley.com/wp-content/uploads/2016/03/opengraph-768x403.jpg"
                details["abstrat"] = event["descriptionPreview"]
                details["abstrat_details"]=event["eventData"]["description"]
                jsonfinal.append(details)

print (jsonfinal)

jsonfinal = json.dumps(jsonfinal,sort_keys=True, ensure_ascii=False,indent=4)
archivo = open("campus_madrid.json","w")
archivo.write(str((jsonfinal)))
archivo.close()