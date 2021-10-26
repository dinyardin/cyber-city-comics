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
