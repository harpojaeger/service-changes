# Fake MTA service changes
A bot that listens for tweets from [@MTA](http://twitter.com/MTA) and [@NYCTSubway](http://twitter.com/NYCTSubway) and retweets them along with a fake service change announcememnt. These fake changes are programatically generated according to a set of rules.

## Usage
1. `yarn install`
1. `yarn dev` to inspect some individual modules (served at `localhost:5000`):
  - `/change`: text of a randomly-generated service change announcement.
  - `/bullet`: a randomly-generated service bullet (the colored logos for each train line) using the MTA's font, layout and color schemes. In the future, this module could be used to generate fake service change posters like the ones you see hanging in the station.
  - `/reason`: just a randomly-generated reasons for the service change.
1. Configure the following envs with [credentials from your Twitter account](http://apps.twitter.com/):
  - `consumer_key`
  - `consumer_secret`
  - `access_token_key`
  - `access_token_secret`
1. `yarn devstream` to connect to the Twitter Streaming API and start sending tweets.
