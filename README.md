# trackHourlyPulseforTG

## Simple JS-solution to track your channel's ERR rate hourly via TGStat API

This script gets data from **TG Stat API** and puts it into your **Google Sheet**. 

## Setup Instructions

1. Extensions -> Apps Script
2. Don't forget to set the timer at Apps Script to 1 hour or less.
3. Suitable for lesser one-man channels approx 10000 subs with 10 posts per day.

## Configuration



### Setup Security

1. Open your Apps Script project.
2. Go to **Project Settings** (gear icon).
3. Scroll down to **Script Properties**.
4. Add a new property with the name `TGSTAT_TOKEN` and paste your API key as the value.
