const baseURL = "http://numbersapi.com";

/* 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. 
(Make sure you get back JSON by including the json query key, specific to this API.*/
async function favNumFact() {
  try{
    let res = await axios.get(`${baseURL}/3?json`);
    console.log(res.data.text);
  } catch (e) {
    console.log(e);
  }
}
favNumFact();

/* 2. Figure out how to get data on multiple numbers in a single request. Make that request and 
when you get the data back, put all of the number facts on the page. */
let numFactsArr = [];
const ul2 = document.querySelector(".q-2 ul");

for (let i = 1; i < 5; i++) {
  numFactsArr.push(axios.get(`${baseURL}/${i}?json`));
}

async function multNumFacts() {
  try {
    let resArr = await Promise.all(numFactsArr);
    resArr.forEach(({data: {text}}) => {
      const li = document.createElement("li");
      li.innerText = text;
      ul2.append(li);
    });
  } catch (e) {
    console.log(e);
  }
}
multNumFacts();

/* 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
 *(Note: You’ll need to make multiple requests for this.)* */
let favNumArr = [3, 3, 3, 3];
const ul3 = document.querySelector(".q-3 ul");

favNumArr = favNumArr.map(num => axios.get(`${baseURL}/${num}?json`))

async function favNumFacts() {
  try {
    let resArr = await Promise.all(favNumArr);
    resArr.forEach(({data: {text}}) => {
      const li = document.createElement("li");
      li.innerText = text;
      ul3.append(li);
    });
  } catch (e) {
    console.log(e);
  }
}
favNumFacts();
