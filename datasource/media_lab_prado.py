# http://medialab-prado.es/events/2016-12-01
# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
import urllib.request
import datetime as dt

# now = dt.datetime.now()
# date = dt.datetime.strptime(str(now.year) +" " + date.text.strip(), '%Y %a, %b %d\n %H:%M %p')
# date.isoformat()
today = (time.strftime("%y-%m-%d"))
now = dt.datetime.now()

date = today

url = "http://medialab-prado.es/events/" + date
request = urllib.request.urlopen(url)

eventsList = []

if request.getcode() == 200:
	request = request.read()
	soup = BeautifulSoup(request, "html.parser")

	pageevents = soup.find("ul", { "class" : "lista"}).findChildren("li")

	if pageevents:

		for event in pageevents:
			currentEvent = {
                "location": {"name": "MediaLab Prado","lon": 40.411321,"lat": -3.693456},
                "price": {},
                "source": {
                    "name": "MediaLab Prado",
                    "logo": "http://blogs.medialab-prado.es/streamlab/wp-content/uploads/sites/28/2016/01/00_logo-medialab-madrid.jpg",
                    "url": "http://medialab-prado.es/"
                }
            }

		eventSoup = BeautifulSoup(event.decode_contents(formatter="html"), "html.parser")
		# 	# date

		# 	# time

		# 	notes
		location = eventSoup.find("div",{"class": "lugar"})
		if location == None:
			location = "MediaLab"
		else:
			location = location.find("p").text.strip()
			currentEvent["location"]["notes"] = location

		# 	# name of the event
		name = eventSoup.find("a")
		currentEvent["title"] = name.text

		# 	# abstract
		abstract = eventSoup.find("blockquote",{"class": "entradilla"})
		currentEvent["abstract"] = abstract.text

		#url
		event_url = eventSoup.find("a", href=True)
		currentEvent["target_url"] = event_url['href']
		currentEvent["source"]["event_url"] = event_url['href']
		

		# 	####### EVENT_URL- TARGET URL
		# 	# event = event.find("a")
		# 	if event.text == "Seguir leyendo…":
		# 		event_url = event['href']
		# 		request2 = urllib.request.urlopen(event_url)   #url of the event 
				
				
		# 		

		# 		if request2.getcode() == 200:
		# 			request2 = request2.read()
		# 			soup = BeautifulSoup(request2, "html.parser")

		# 			
						
	else:
		print("no existen eventos")
else:
	print("Error con la petición.")


