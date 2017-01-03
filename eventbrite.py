# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
import urllib

url = "https://www.eventbrite.com/d/spain--madrid/science-and-tech--events/madrid/?crt=regular&sort=date"
request = urllib.urlopen(url)

print "status code: " + str(request.getcode())
if request.getcode() == 200:
    request = request.read()
    soup = BeautifulSoup(request)
    
    events = soup.findAll("div", { "class" : "search-date-group"})

    if events:
        for event in events:
            print event
    else: 
        print "No existen eventos!"
    
    # print request
else:
    print "Error con la petición."