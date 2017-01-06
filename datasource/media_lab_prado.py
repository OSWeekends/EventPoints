# http://medialab-prado.es/events/2016-12-01
# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
import urllib.request
import time
import datetime as dt



date = (time.strftime("%y-%m-%d"))
eventsList = []

for day in range(0,7):
	
	url = "http://medialab-prado.es/events/" + date
	request = urllib.request.urlopen(url)
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
			dateannounced = eventSoup.find('h6')
			currentEvent["date"] = dateannounced.text.strip()

			# 	notes
			location = eventSoup.find("div",{"class": "lugar"})
			if location == None:
				location = "MediaLab"
			else:
				location = location.find("p").text.strip()
				currentEvent["location"]["notes"] = location

			# 	# name of the event
			title = eventSoup.find("a")
			currentEvent["title"] = title.text.strip()

			# 	# abstract
			abstract = eventSoup.find("blockquote",{"class": "entradilla"})
			currentEvent["abstract"] = abstract.text

			#url
			event_url = eventSoup.find("a", href=True)
			currentEvent["target_url"] = event_url['href']
			currentEvent["source"]["event_url"] = event_url['href']
			
			eventsList.append(currentEvent)
			
				
		else:
			print("no existen eventos")
	else:
		print("Error con la petición.")

	day = dt.datetime.strptime(date, "%y-%m-%d").date()
	date = (day + dt.timedelta(days=1)).strftime("%y-%m-%d")
	
	
	
print(eventsList)

