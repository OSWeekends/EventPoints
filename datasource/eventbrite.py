# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
from urllib.request import urlopen
import json
import re
import datetime as dt

# Ampliación pendiente
# https://www.eventbrite.com/d/spain--madrid/science-and-tech--events/madrid/?crt=regular&end_date=01%2F18%2F2017&sort=best&start_date=01%2F18%2F2017
# https://www.eventbrite.com/d/spain--madrid/science-and-tech--events--next-week/madrid/?crt=regular&sort=date

url = "https://www.eventbrite.com/d/spain--madrid/science-and-tech--events/madrid/?crt=regular&sort=date"
request = urlopen(url)

eventList = []

if request.getcode() == 200:
    request = request.read()
    soup = BeautifulSoup(request, "html5lib")
    
    events = soup.findAll("div", { "class" : "search-date-group"})

    if events:
        for event in events:
            currentEvent = {
                "location": {},
                "price": {},
                "source": {
                    "name": "Evenbrite",
                    "logo": "https://eventbrite-s3.s3.amazonaws.com/marketing/landingpages/shared/images/eb-logo.png",
                    "url": "https://www.eventbrite.es"
                }
            }
            
            eventSoup = BeautifulSoup(event.decode_contents(formatter="html"), "html5lib")
            date = eventSoup.find("time", {"class": "list-card__date"})
            title = eventSoup.find("div", {"class": "list-card__title"})
            location = eventSoup.find("div", {"class": "list-card__venue"})
            nextUrl = eventSoup.find("a", {"class": "list-card__main"})
            if title and date and nextUrl:
                
                now = dt.datetime.now()
                date = dt.datetime.strptime(str(now.year) +" " + date.text.strip(), '%Y %a, %b %d\n %H:%M %p')
                date.isoformat()
                
                currentEvent["date"] = str(date).replace(" ", "T") + "Z"
                currentEvent["title"] = title.text.strip()
                currentEvent["location"]["name"] = location.text.strip()
                currentEvent["source"]["event_url"] = nextUrl['href']
                currentEvent["target_url"] = nextUrl['href']
                
                requestCurrentEvent = urlopen(currentEvent["source"]["event_url"])
                if requestCurrentEvent.getcode() == 200:
                    
                    print("Estado actual:", currentEvent["source"]["event_url"])
                    
                    currentEventSoup = BeautifulSoup(requestCurrentEvent, "html5lib")
                    priceRaw = currentEventSoup.find("div", {"class": "js-display-price"})
                    abstractDetails = currentEventSoup.find("div", {"class": "js-xd-read-more-contents"})
                    locationDetails = currentEventSoup.find("a", {"class", "js-view-map-link"})
                    
                    if priceRaw and abstractDetails and locationDetails:
                        
                        locationDetails = locationDetails["href"]
                        locationDetails = re.search('(?=)([\-]?[\d]*\.[\d]*),([\-]?[\d]*\.[\d]*)(?=&)', locationDetails)
                        locationDetails = locationDetails.group(0).split(",")
                        
                        currentEvent["location"]["notes"] = False
                        currentEvent["location"]["lat"] = float(locationDetails[0])
                        currentEvent["location"]["lng"] = float(locationDetails[1])
                        
                        currentEvent["abstract_details"] = abstractDetails.text.strip()
                        currentEvent["abstract"] = currentEvent["abstract_details"][0:500]
                        
                        priceRaw = priceRaw.text.strip()
                        
                        if (priceRaw == "Gratis" or priceRaw == "Free" or priceRaw == None):
                            currentEvent["price"]["isFree"] = True
                            currentEvent["price"]["details"] = False
                        else:
                            currentEvent["price"]["isFree"] = False
                            currentEvent["price"]["details"] = priceRaw
                        
                        startWeek = now + dt.timedelta(days=1)
                        finishWeek = now + dt.timedelta(days=7)
                        
                        if date > startWeek and date < finishWeek:
                            eventList.append(currentEvent)
                else:
                    print("Error! Al intentar capturar más detalles")
            else:
                print("Error! Al intentar capturar los detalles")
    else: 
        print("No existen eventos!")
else:
    print("Error con la petición.")

text_file = open("output/eventbrite.json", "w")
print("Guardado... en eventbrite.json")
text_file.write(json.dumps(eventList, sort_keys=True, ensure_ascii=False, indent=4))
text_file.close()

