let currentNumber = null;

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
