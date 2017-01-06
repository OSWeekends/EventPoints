# http://medialab-prado.es/events/2016-12-01
# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
from urllib.request import urlopen
import time
import datetime as dt



date = (time.strftime("%y-%m-%d"))
# print(date) ok
eventsList = []
one_by_one_event = []

for day in range(0,8):
	
	url = "http://medialab-prado.es/events/" + date
	request = urlopen(url)
	if request.getcode() == 200:
		request = request.read()
		soup = BeautifulSoup(request, "html.parser")

		pageevents = soup.find("ul", { "class" : "lista"}).findChildren("li")

		if pageevents:
			# # print(eventsList) ok print an array of arrays of events. therefore number is 7
			eventsList.append(pageevents)
			for events in pageevents:
				one_by_one_event.append(events)
			# 	for event in events:
					# one_by_one_event.append(event)
					#print one by one length = 144
					# print(events) print every single event in html
					# currentEvent = {
				 #        "location": {"name": "MediaLab Prado","lon": 40.411321,"lat": -3.693456},
				 #        "price": {},
				 #        "source": {
				 #        "name": "MediaLab Prado",
				 #        "logo": "http://blogs.medialab-prado.es/streamlab/wp-content/uploads/sites/28/2016/01/00_logo-medialab-madrid.jpg",
				 #        "url": "http://medialab-prado.es/"
				 #        }
				 #    }

			# 		eventSoup = BeautifulSoup(event, "html.parser")
			# 		title = eventSoup.find("a")
			# 		dateannounced = eventSoup.find('h6')
			# 		event_url = eventSoup.find("a", href=True)
			# 		abstract = eventSoup.find("blockquote",{"class": "entradilla"})
			# 		if abstract and title and dateannounced and event_url:
			# 			currentEvent["title"] = title.text.strip()
			# 			currentEvent["date"] = dateannounced.text.strip()
			# 			currentEvent["target_url"] = event_url['href']
			# 			currentEvent["source"]["event_url"] = event_url['href']
			# 			currentEvent["abstract"] = abstract.text
			# 		# eventsList.append(currentEvent)


				
			# 	# location = eventSoup.find("div",{"class": "lugar"})
			# 	# if location == None:
			# 	# 	location = "MediaLab"
			# 	# else:
			# 	# 	location = location.find("p").text.strip()
			# 	# 	currentEvent["location"]["notes"] = location
		
			# 	else:
			# 		print("no exiten eventos")
	# 	else:
	# 		print("no existen eventos")
	# else:
	# 	print("Error con la petición.")

	day = dt.datetime.strptime(date, "%y-%m-%d").date()
	date = (day + dt.timedelta(days=1)).strftime("%y-%m-%d")
	
	
	
print(len(one_by_one_event))

