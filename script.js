document.getElementById("button1").addEventListener("click", getNextComic);

//https://rocky-sands-68974.herokuapp.com/

function getNextComic() {
  async function getData() {
    const response = await fetch("https://xkcd.com/info.0.json");

    const data = await response.json();

    //console.log(data);
    return data;
  }

  getData()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

//https://xkcd.com/info.0.json

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
      document.getElementById("iframe").setAttribute("src", res.img);
    })
    .catch((err) => {
      console.log(err);
    });
}
