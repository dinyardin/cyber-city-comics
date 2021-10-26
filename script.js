let currentNumber = null;
let currentNumber_reference = null;

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
      document.getElementById("iframe").setAttribute("src", res.img);
      document.getElementById("title").innerHTML = `Title: ${res.title}`;
      document.getElementById("alt").innerHTML = res.alt;
      document.getElementById("year").innerHTML = res.year;
      document.getElementById("month").innerHTML = res.month;
      document.getElementById("day").innerHTML = res.day;
    })
    .catch((err) => {
      console.log(err);
    });
}

document.getElementById("previous").addEventListener("click", getPreviousComic);

async function getPreviousComic() {
  document.getElementById("next").disabled = false;
  const newNumber = currentNumber - 1;
  const response = await fetch(`https://xkcd.com/${newNumber}/info.0.json`);
  await response.json().then((data) => {
    console.log(data);
    document.getElementById("iframe").setAttribute("src", data.img);
    document.getElementById("title").innerHTML = `Title: ${data.title}`;
    document.getElementById("alt").innerHTML = data.alt;
    document.getElementById("year").innerHTML = data.year;
    document.getElementById("month").innerHTML = data.month;
    document.getElementById("day").innerHTML = data.day;
  });
  currentNumber--;
}

document.getElementById("next").addEventListener("click", getNextComic);

async function getNextComic() {
  const newNumber = currentNumber + 1;

  const response = await fetch(`https://xkcd.com/${newNumber}/info.0.json`);
  await response.json().then((data) => {
    console.log(data);
    document.getElementById("iframe").setAttribute("src", data.img);
    document.getElementById("title").innerHTML = `Title: ${data.title}`;
    document.getElementById("alt").innerHTML = data.alt;
    document.getElementById("year").innerHTML = data.year;
    document.getElementById("month").innerHTML = data.month;
    document.getElementById("day").innerHTML = data.day;
  });
  currentNumber++;
  if (newNumber == currentNumber_reference) {
    document.getElementById("next").disabled = true;
  }
}
