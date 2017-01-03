# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
from urllib.request import urlopen

url = "https://www.eventbrite.com/d/spain--madrid/science-and-tech--events/madrid/?crt=regular&sort=date"
request = urlopen(url)

if request.getcode() == 200:
    request = request.read()
    soup = BeautifulSoup(request, "html5lib")
    
    events = soup.findAll("div", { "class" : "search-date-group"})

    if events:
        for event in events:
            eventSoup = BeautifulSoup(event.decode_contents(formatter="html"), "html5lib")
            fecha = eventSoup.find("time", {"class": "list-card__date"})
            titulo = eventSoup.find("div", {"class": "list-card__title"})
            if titulo and fecha:
                print(titulo.text.strip())
                print(fecha.text.strip())
    else: 
        print("No existen eventos!")
    
    # print request
else:
    print("Error con la petición.")