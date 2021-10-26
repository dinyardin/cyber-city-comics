//Global variables
let currentNumber = null;
let currentNumber_reference = null;

//Displays the latest comic when page initially loads
function getCurrentComicNumber() {
  document.getElementById("next").disabled = true;
  async function getCurrentNumber() {
    const response = await fetch("https://xkcd.com/info.0.json");
    const data = await response.json();
    return data;
  }

  getCurrentNumber()
    .then((res) => {
      console.log(res.num);
      currentNumber = res.num;
      currentNumber_reference = res.num;
      populateComicDetails(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

//Displays the previous comic when previos button is clicked
document.getElementById("previous").addEventListener("click", getPreviousComic);

async function getPreviousComic() {
  document.getElementById("next").disabled = false;
  const newNumber = currentNumber - 1;
  const response = await fetch(`https://xkcd.com/${newNumber}/info.0.json`);
  await response.json().then((data) => {
    populateComicDetails(data);
  });
  currentNumber--;
}

//Displays the next comic when next button is clicked
document.getElementById("next").addEventListener("click", getNextComic);

async function getNextComic() {
  const newNumber = currentNumber + 1;

  const response = await fetch(`https://xkcd.com/${newNumber}/info.0.json`);
  await response.json().then((data) => {
    populateComicDetails(data);
  });
  currentNumber++;
  if (newNumber == currentNumber_reference) {
    document.getElementById("next").disabled = true;
  }
}

//Displays a random comic when random button is clicked
document.getElementById("random").addEventListener("click", getRandomComic);

async function getRandomComic() {
  document.getElementById("next").disabled = false;
  const newNumber = getRandomNumber(currentNumber_reference);

  const response = await fetch(`https://xkcd.com/${newNumber}/info.0.json`);
  await response.json().then((data) => {
    populateComicDetails(data);
  });

  console.log(newNumber);
  if (newNumber == currentNumber_reference) {
    document.getElementById("next").disabled = true;
  }
  //This is so that previous/next comics will start from this day as the new referance
  currentNumber = newNumber;
}

//Display about page when about link is clicked
document.getElementById("about").addEventListener("click", getAboutPage);

async function getAboutPage() {
  document
    .getElementById("iframe")
    .setAttribute("src", "/components/about.html");
}

//Display current day's comic when logo is clicked
document
  .getElementById("logo")
  .addEventListener("click", getCurrentComicNumber);

//Helper function that populates comic details on page
function populateComicDetails(data) {
  document.getElementById("iframe").setAttribute("src", data.img);
  document.getElementById("title").innerHTML = data.title;
  document.getElementById("alt").innerHTML = data.alt;
  document.getElementById("year").innerHTML = `&nbsp${data.year}&nbsp`;
  document.getElementById("month").innerHTML = `${data.month}&nbsp`;
  document.getElementById("day").innerHTML = data.day;
}

//Helper function that generates a random number between given ranges
function getRandomNumber(maxLimit) {
  return Math.floor(Math.random() * maxLimit);
}
