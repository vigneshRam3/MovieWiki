document.getElementById("search").addEventListener("click", search);

function search(e) {
  e.preventDefault();
  let s = document.getElementById("keyword").value;

  fetch("http://www.omdbapi.com/?apikey=e4c94c7a&s=" + s )
    .then(res => res.json())
    .then(data => {
      let output = "";
      data.Search.forEach(function(movie) {
        output += `
                    <span class="movie" id="${movie.imdbID}" onclick="details('${movie.imdbID}')">
                        <img src="${movie.Poster}">
                        <p>${movie.Title}(${movie.Year})</p>
                    </span>
                `;
      });
      document.getElementById("output").innerHTML = output;
      document.getElementById("output").style.display = "grid";
    })
    .catch(err => console.log(err));
}
function details(id) {
  fetch("http://www.omdbapi.com/?i=" + id + "&apikey=e4c94c7a")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      let output = "";
      output += `
                    <h1>${data.Title} (${data.Year})</h1>
                    <h3>${data.Rated}</h3>
                    <img src="${data.Poster}"><br/>
                    <a href="https://imdb.com/title/${id}">
                        <img src="https://img.icons8.com/color/48/000000/imdb.png">
                    </a><br/>
                    IMDb Score: ${data.imdbRating}
                    Metacritic: ${data.Metascore}
                    <p><b>Released:</b> ${data.Released}</p>
                    <p><b>Production Company:</b> ${data.Production}</p>
                    <p><b>Director:</b> ${data.Director}</p>
                    <p><b>Writer(s):</b> ${data.Writer}</p>
                    <h3>Plot</h3>
                    <p>${data.Plot}</p>
                    <p><b>Runtime:</b> ${data.Runtime}</p>
                    <p><b>Genre:</b> ${data.Genre}</p>
                    <p><b>Cast:</b> ${data.Actors}</p>
                    <p><b>Languages:</b> ${data.Language}</p>
                    <p><b>Countries:</b> ${data.Country}</p>
                    <p><b>Awards:</b> ${data.Awards}</p>
                    `;
      document.getElementById("output").innerHTML = output;
      document.getElementById("output").style.display = "block";
      document.getElementById("output").style.margin = "10px";
    })
    .catch(err => console.log(err));
}
