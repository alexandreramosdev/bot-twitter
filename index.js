const Twit = require('twit')

require('dotenv').config()

const Bot = new Twit({
  consumer_key:        process.env.CONSUMER_KEY,
  consumer_secret:     process.env.CONSUMER_SECRET,
  access_token:        process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout:             60 * 1000,
})

function BotRetweeted(error, response) {
  if(error){
    console.log(`Bot não pode retweetar,: ${error}`)
    return
  }

  console.log(`Bot retweetou, : ${response.id_str}`)
}

function BotGotLatestTweet(error, data, response){
  if(error){
    console.log(`Bot não pode achar o ultimo tweet, : ${error}`)
    return
  }

  data.statuses.forEach(t => Bot.post('statuses/retweet/:id', {id: t.id_str}, BotRetweeted))
}

function BotInit(){
  const query = {
    q: "#js OR #javascript OR #reactjs OR #nodejs",
    result_type: "recent"
  }

  Bot.get('search/tweets', query, BotGotLatestTweet)
}

setInterval(BotInit, 10*60*1000)

BotInit()
