# Fake MTA service changes
[![Build Status](https://travis-ci.org/harpojaeger/service-changes.svg?branch=master)](https://travis-ci.org/harpojaeger/service-changes)

A bot that listens for tweets from [@NYCTSubway](http://twitter.com/NYCTSubway) and retweets them along with a fake service change announcement. Follow [@NotMTA](http://twitter.com/notmta) to see it in action!

## Usage
1. `yarn install`
2. `yarn dev` to inspect some individual modules (served at `localhost:5000`):
    - `/change`: text of a randomly-generated service change announcement.
    - `/bullet`: a randomly-generated service bullet (the colored logos for each train line) using the MTA's font, layout and color schemes. In the future, this module could be used to generate fake service change posters like the ones you see hanging in the station.
    - `/reason`: just a randomly-generated reasons for the service change.
3. `cp .env.example .env` and configure envs. You'll need [credentials from your Twitter account](http://apps.twitter.com/) for the Twitter envs.
4. Configure envs `TRACK` and `NODE_ENV`. If `TRACK` is set, the Twitter streaming client will be passed its value as the user ID of the Twitter account to follow. (Note that user IDs are not the same as Twitter usernames – a user ID is an integer.) @NYCTSubway is user ID `66379182`. If `TRACK` is unset, the string 'javascript' is passed to the streaming filter, to ensure plenty of tweets to test the settings. Set `NODE_ENV=production` to enable sending of tweets, in addition to `console.log`ing them.
5. `yarn devstream` to connect to the Twitter Streaming API and start listening for tweets.

## Testing

`yarn test` to run tests. They're fairly limited right now, but I'm working on building them out, particularly for the filter module.
