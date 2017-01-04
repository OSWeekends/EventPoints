# http://medialab-prado.es/events/2016-12-01
# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
import urllib.request
import datetime

date = "2017-01-06"

url = "http://medialab-prado.es/events/" + date
request = urllib.request.urlopen(url)

if request.getcode() == 200:
	request = request.read()
	soup = BeautifulSoup(request, "html.parser")

	pageevents = soup.find("ul", { "class" : "lista"})

	if pageevents:
		pageevents = pageevents.findChildren("a")

		for event in pageevents:
				if event.text == "Seguir leyendo…":
					event_url = event['href']
					request2 = urllib.request.urlopen(event_url)
					
					if request2.getcode() == 200:
						request2 = request2.read()
						soup = BeautifulSoup(request2, "html.parser")

						location = soup.find("div", { "class" : "lugar"})
						if location == None:
							location = "MediaLab"
						else:
							location = location.find("p")
						print (location)
						
						description = soup.find("div", { "class" : "entradilla"})
						print(description.text)

	
	else:
		print("no existen eventos")
else:
    print("Error con la petición.")


