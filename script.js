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
  });
  currentNumber++;
  if (newNumber == currentNumber_reference) {
    document.getElementById("next").disabled = true;
  }
}
