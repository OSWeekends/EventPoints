# http://medialab-prado.es/events/2016-12-01
# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
from urllib.request import urlopen
import time
import datetime as dt



date = (time.strftime("%y-%m-%d"))


# print(date) ok
eventsList = []
one_by_oneevent = []
jsonfinal = []

for day in range(0,7):
	# adding one to the initial date ok
	oneday = dt.datetime.strptime(date, "%y-%m-%d").date()
	date = (oneday + dt.timedelta(days=1)).strftime("%y-%m-%d")
	# print(date)

	url = "http://medialab-prado.es/events/" + date
	request = urlopen(url)
	# print(request)
	if request.getcode() == 200:
		request = request.read()
		soup = BeautifulSoup(request, "html.parser")

		pageevents = soup.find("ul", { "class" : "lista"})
		if pageevents:
			# print(len(pageevents)) *** weird number appearing
			eventsList.append(pageevents)
			# 	# # print(eventsList) ok print an array of pages. therefore number is 7
			# print(len(eventsList))
		else:
			print("no existen eventos")
	else:
		print("Error con la petición.")



for page in eventsList:
	# print("**********", page ,"************")
	for event in page:
		if event != ' ':
			# print("-------", event ,"*******")
			one_by_oneevent.append(event)
			# lenngth of one-ny one event print the exact bnumber of events

for one_event in one_by_oneevent:
	currentEvent = {
				"location": {"name": "MediaLab Prado","lng": 40.411321,"lat": -3.693456},
				"price": {},
				"source": {
				"name": "MediaLab Prado",
				"logo": "http://blogs.medialab-prado.es/streamlab/wp-content/uploads/sites/28/2016/01/00_logo-medialab-madrid.jpg",
				"url": "http://medialab-prado.es/"
				}
	}
			
	eventSoup = BeautifulSoup(one_event.decode_contents(formatter="html"), "html.parser")
	title = eventSoup.find("a")
	dateannounced = eventSoup.find('h6')
	event_url = eventSoup.find("a", href=True)
	abstract = eventSoup.find("blockquote",{"class": "entradilla"})
	if abstract and title and dateannounced and event_url:
		currentEvent["title"] = title.text.strip()
		currentEvent["date"] = dateannounced.text.strip()
		currentEvent["target_url"] = event_url['href']
		currentEvent["source"]["event_url"] = event_url['href']
		currentEvent["abstract"] = abstract.text
	jsonfinal.append(currentEvent)

print(len(jsonfinal))
					

		# 			

				
			# 	# location = eventSoup.find("div",{"class": "lugar"})
			# 	# if location == None:
			# 	# 	location = "MediaLab"
			# 	# else:
			# 	# 	location = location.find("p").text.strip()
			# 	# 	currentEvent["location"]["notes"] = location
		
			# 	else:
			# 		print("no exiten eventos")
	
	

	
	
	
	


