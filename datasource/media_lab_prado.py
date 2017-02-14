# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
from urllib.request import urlopen
import time
import datetime as dt
import json



date = (time.strftime("%y-%m-%d"))



eventsList = []
one_by_oneevent = []
jsonfinal = []

#date is included in the url
#iterate through all the pages  and take each page information
for day in range(0,7):
	oneday = dt.datetime.strptime(date, "%y-%m-%d").date()
	date = (oneday + dt.timedelta(days=1)).strftime("%y-%m-%d")


url = "http://medialab-prado.es/events/" + date
request = urlopen(url)
if request.getcode() == 200:
	request = request.read()
	soup = BeautifulSoup(request, "html.parser")
	pageevents = soup.find("ul", { "class" : "lista"})
	if pageevents:
		eventsList.append(pageevents)
else:
	print("Error con la petición.")


#iterate through all the event on one page
for page in eventsList:
	for event in page:
		if event != ' ':
			one_by_oneevent.append(event)

#take information from each event
for one_event in one_by_oneevent:
	currentEvent = {
				"location": {"name": "MediaLab Prado","notes": False, "lng": 40.411321,"lat": -3.693456},
				"price": {
				"isFree": True,
						"isTrusted": False,
						"details": "estimado"
				},
				"location": {"name": "MediaLab Prado","lng": 40.411321,"lat": -3.693456},
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
		date = dateannounced.text.strip().replace(' ', '')
		if len(date) > 10 :
			date = date[:-8]
		else:
			date = date + '00:00'

		date = dt.datetime.strptime(date, "%d.%m.%Y%H:%M")
		date = date.isoformat()

		currentEvent["date"] =  str(date).replace(" ", "T") + "Z"
		currentEvent["target_url"] = event_url['href']
		currentEvent["source"]["event_url"] = event_url['href']
		currentEvent["abstract"] = abstract.text
		currentEvent["abstract-details"] = abstract.text
	
	jsonfinal.append(currentEvent)
print (jsonfinal)

text_file = open("output/media-lab-prado.json", "w")
print("Guardado... en medialab.json")
text_file.write(json.dumps(jsonfinal, sort_keys=True, ensure_ascii=False, indent=4))
text_file.close()
					


	
	

	
	
	
	


