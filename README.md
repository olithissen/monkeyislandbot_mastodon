# monkeyislandbot

A Mastodon-port of my Twitter bot (@monkeyislandbot) tweeting monkey island quotes (while it could tweet basically anything)

# Prerequisites 

_I'm using https://mastodon.social in the examples but of course you can and should pick the instance of your choice._

The Mastodon Bot is available at https://social.tchncs.de/@monkeyislandbot

## Tools

You will need the following tools installed and configured

- Node.js >= 16
- Serverless (https://www.serverless.com/)
- AWS CLI (and a working AWS account, obviously)

## Test locally

- Create a new application on your instance of choice (https://mastodon.social/settings/applications)
- Make sure you have the `write:statuses` scope activated
- Clone and `npm init`

```
sls invoke local -f mibot --verbose --stage dev \
 -e ACCESS_TOKEN=<your application acess token> \ 
 -e API_URL=https://mastodon.social/api/v1/
```

## Deploy to AWS

As seen above, the bot requires two environment variables, `ACCESS_TOKEN` and `API_URL`.
The `serverless.yml` maps them from the _Systems Manager_ parameter tab.
Create two parameters: `mibot_mastodon_de_access_token` to map to `ACCESS TOKEN` and `mibot_mastodon_de_api_url` for `API_URL`.

Then get some coffee and wait for `serverless deploy` to do its work.
