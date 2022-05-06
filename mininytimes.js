//https://www.nytimes.com/crosswords/game/mini
//https://www.nytimes.com/crosswords/game/daily/2018/09/14

crossword = "https://nyt-games-prd.appspot.com/svc/crosswords/v6/puzzle/daily/2018-09-14.json"
mini = "https://nyt-games-prd.appspot.com/svc/crosswords/v6/puzzle/mini.json"
response = await fetch(mini, {
  "headers": {
    "accept": "*/*",
    "accept-language": "en",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded",
    "nyt-s": "undefined",
    "pragma": "no-cache",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "sec-gpc": "1"
  },
  "referrer": "https://www.nytimes.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
});
json = await response.json()
w = json.body[0].dimensions.width
h = json.body[0].dimensions.height
answers = Array(h).fill(1).map(e => Array(w).fill(""))

for (y = 0; y < h; y++) {
  for (x = 0; x < w; x++) {
    answers[y][x] = json.body[0].cells[y * w + x].answer ?? " "
  }
}
console.table(answers.map(a => a.join("")))
console.log(answers.reduce((a, b) => a + b.join("") + "\n", ""))


