import requests
import json
from types import SimpleNamespace
from bs4 import BeautifulSoup
from elasticsearch import Elasticsearch
import sys

es = Elasticsearch()

newPastes: int = 0


class Paste:  # Paste object
    def __init__(self, title, user, content, date):
        self.title = title
        self.user = user
        self.content = content
        self.date = date

    def show(self):
        print(self.title, self.user, self.content, self.date)


proxies = {'http':  'socks5h://localhost:9050',
           'https': 'socks5h://localhost:9050'}

data = requests.get('http://nzxj65x32vh2fkhk.onion/all', proxies=proxies).text  # page html

soup = BeautifulSoup(data, "html.parser")
links = soup.findAll('a')
links = links[5:-4]  # links to all the pastes


f = open('C:/Users/Roy/Documents/GitHub/scraping-dashboard/python-scraper/data.json', mode='r', encoding='utf-8')
s = f.read()
date: str = ''   # dates of all submitted pastes
x: list = []

if s:
    x = json.loads(s)  # load json data

    date = json.loads(x[0], object_hook=lambda d: SimpleNamespace(**d)).date

for index, link in enumerate(links):
    try:
        data = requests.get(link.get('href'), proxies=proxies).text  # page html
        soup = BeautifulSoup(data, "html.parser")
        liList = soup.findAll('li')
        date1 = soup.find("div", class_="col-sm-6").text.split(' ')[4:8]  # date
        date1 = date1[0] + ' ' + date1[1] + ' ' + date1[2] + ' ' + date1[3]
        date1 = date1.replace(',', '')
        if date1 == date:
            print('already scraped')
            break
        user1 = soup.find("div", class_="col-sm-6").text.split(' ')[2]  # user name
        if user1 == '':
            user1 = 'Anonymous'
        title1 = soup.find('h4').text.strip()  # title
        content1: str = ''  # content
        for li in liList:  # get content from li elements
            if li.find('div'):
                content1 += li.find('div').text.strip() + ' '
        pasteObject = Paste(title1, user1, content1, date1)
        x.insert(index, json.dumps(pasteObject.__dict__))
        newPastes+=1
    except:
        print('broken link: ', link)



if newPastes > 0:
    with open('C:/Users/Roy/Documents/GitHub/scraping-dashboard/python-scraper/data.json', mode='w', encoding='utf-8') as outfile:
        json.dump(x, outfile)

    f = open('C:/Users/Roy/Documents/GitHub/scraping-dashboard/python-scraper/data.json', mode='r', encoding='utf-8')
    s = f.read()
    x = json.loads(s)  # load json data
    for index, obj in enumerate(x):
        y = json.loads(obj, object_hook=lambda d: SimpleNamespace(**d))
        obj = {'title': y.title, 'user': y.user, 'content': y.content, 'date': y.date}
        res = es.index(index="scraping-data", id=index, body=obj)

print('finished scraping', newPastes)
sys.stdout.flush()