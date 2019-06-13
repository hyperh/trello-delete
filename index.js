const axios = require("axios");
const config = require("./config");

const { apiKey, token, boardId } = config;

const closedCardsUrl = `https://api.trello.com/1/boards/${
  boardId
}/cards/closed/?key=${apiKey}&token=${token}`;

const getCardUrl = id =>
  `https://api.trello.com/1/cards/${id}/?key=${apiKey}&token=${token}`;

// https://help.trello.com/article/838-api-rate-limits
/*
To help prevent strain on Trello’s servers, our API imposes rate limits 
per API key for all issued tokens. There is a limit of 300 requests per 
10 seconds for each API key and no more than 100 requests per 10 second 
interval for each token. If a request exceeds the limit, Trello will 
return a 429 error.
*/
const delay = 150;

const run = () =>
  axios.get(closedCardsUrl).then(res => {
    console.log(`${res.data.length} archived cards found...`);
    makeDeletePs = res.data
      .map(card => getCardUrl(card.id))
      .map(url => () => axios.delete(url));

    for (let i = 0; i < makeDeletePs.length; i++) {
      const card = res.data[i];
      if (card.closed) {
        setTimeout(() => {
          makeDeletePs[i]().then(() =>
            console.log(i, card.name, card.shortUrl)
          );
        }, i * delay);
      }
    }
  });

run().catch(console.log);
