var type = 'movies';
var baseUrl = window.location.origin;

var options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzM5NzQwMjk2YTdkNWU5YTRlYjhlZjU1ODZiMzJjMiIsIm5iZiI6MTcyMzA5NjQ1Ni4wMTE2MzksInN1YiI6IjY2YTcyZWU0YWNkYzZjZGFmYWIxOWRhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TDXBSYS4CWW-MH2DE14gYRHQ5mV_un9foW8rhfWAnf8'
    }
};

var GENRES = [{genre: 'Action', name: 'action'},{genre: 'Animated TV Shows',
name: 'animated-tv-shows'}, {genre:
'Anime', name : 'anime'}, {genre: 'Chinese',
name: 'chinese'}, {genre: 'Ghibli', name: 'studio-ghibli'}, {genre: 'Fantasy' , name: 'fantasy'}, {genre: 'Filipino', name: 'filipino-films'}, {genre: 'Horror',
name: 'horror'}, {genre: 'Korean', name: 'korean'}, {genre: 'Sci-Fi', name:
'sci-fi'}, {genre: 'Thriller', name: 'thriller'}, {genre: 'War', name: 'war'}];

  async function fetch_genres() {
      const requests = [
          fetch('https://api.themoviedb.org/3/search/movie?query=deadpool%20%26%20wolverine&include_adult=false&language=en-US&page=1', options),
          
          fetch('https://api.themoviedb.org/3/search/tv?query=family%20guy&include_adult=false&language=en-US&page=1', options),
          fetch('https://api.themoviedb.org/3/search/tv?query=jujutsu&include_adult=false&language=en-US&page=1', options),
          fetch('https://api.themoviedb.org/3/search/tv?query=a%20love%20so%20beautiful&first_air_date_year=2017&include_adult=false&language=en-US&page=1', options),
          fetch('https://api.themoviedb.org/3/search/movie?query=howl%27s%20moving%20castle&include_adult=false&language=en-US&page=1', options),
          fetch('https://api.themoviedb.org/3/search/movie?query=damsel&include_adult=false&language=en-US&page=1', options),
          fetch('https://api.themoviedb.org/3/search/movie?query=my%20zombabe&include_adult=false&language=en-US&page=1', options),
          fetch('https://api.themoviedb.org/3/search/movie?query=kuyang&include_adult=false&language=en-US&page=1', options),
          fetch('https://api.themoviedb.org/3/search/tv?query=alchemy%20of%20souls&include_adult=false&language=en-US&page=1', options),
          fetch('https://api.themoviedb.org/3/search/movie?query=65&include_adult=false&language=en-US&page=1', options),
          fetch('https://api.themoviedb.org/3/search/movie?query=trigger%20warning&include_adult=false&language=en-US&page=1', options),
          fetch('https://api.themoviedb.org/3/search/movie?query=the%20wall&include_adult=false&language=en-US&page=1', options)
      ];
  
      try {
          const responses = await Promise.all(requests);
          const jsonResponses = await Promise.all(responses.map(res => res.json()));
          
          // Extract the first image URL from each response
          const imageUrls = jsonResponses.map(response => {
              if (response.results && response.results.length > 0) {
                  return `https://image.tmdb.org/t/p/w500${response.results[0].poster_path}`;
              }
              return null;
          });
  
          // Filter out null values (in case no image was found)
          const validImageUrls = imageUrls.filter(url => url !== null);

          setTimeout(() => {
              $(".preload-logo").animate({
                  "opacity" : "0"
              }, "fast")
              $(".preload").addClass("preload2");
          }, 1000)
          
          setTimeout(function () {
              $(".preload-logo").remove();
              $(".preload").remove();
          }, 2000);
          
            for (let i = 0; i < validImageUrls.length; i++) {
              document.getElementById("main").insertAdjacentHTML("beforeend", `
              <div data-genre="${GENRES[i].name}">
                  <div>
                      <img src="${validImageUrls[i]}" alt="${GENRES[i].genre}"/>
                      <p class="text-center"><span>${GENRES[i].genre}</span></p>
                  </div>
              </div>`);
            }
            document.getElementById("main").insertAdjacentHTML("beforeend", `
            <div data-genre="movies">
                <div>
                    <img src="https://placehold.jp/121211/0cad0c/200x350.png?text=MOVIES" alt="Movies"/>
                    <p class="text-center"><span></span></p>
                </div>
            </div>`);
            document.getElementById("main").insertAdjacentHTML("beforeend", `
            <div data-genre="series">
                <div>
                    <img src="https://placehold.jp/121211/0cad0c/200x350.png?text=SERIES" alt="Series"/>
                    <p class="text-center"><span></span></p>
                </div>
            </div>`);

          $(".main > div").click(function(event){
              event.stopImmediatePropagation();
              let genre = $(this).data("genre");
              window.open(`/${genre}/`, "_self");
          })
  
      // Now you can do something with the image URLs, such as displaying them
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }
  fetch_genres();

        
$(document).ready(function() {
    let hidden = true;
    $(".side-bar ul li, header ul li").click(function(event){
        event.stopImmediatePropagation();
        let t =$(this).data('type');
        if (t == 'movies') {
            window.open(baseUrl + "/movies/", "_self");
        } else if (t == "series"){
            window.open(baseUrl + "/series/", "_self");
        } else if (t == "home"){
            window.open(baseUrl, "_self");
        } else if (t == "privacy"){
            window.open(baseUrl + "/privacy-policy/", "_self");
        }
    })
    $(".bars").click(function(event){
        event.stopImmediatePropagation();
        if (hidden) {
            $(".side-bar").animate({
                "left" : "0",
            }, 500);
            
            $(".bars div:nth-child(2)").hide();
            $(".bars div:nth-child(1)").addClass("r1");
            $(".bars div:nth-child(3)").addClass("r2");
            $(".bars div:nth-child(1)").removeClass("rb1");
            $(".bars div:nth-child(3)").removeClass("rb2");
            hidden = false;
            
        } else {
                $(".side-bar").animate({
                "left" : "-81vw",
            }, 500);
            $(".bars div:nth-child(2)").show("1000");
            $(".bars div:nth-child(1)").addClass("rb1");
            $(".bars div:nth-child(3)").addClass("rb2");
            $(".bars div:nth-child(1)").removeClass("r1");
            $(".bars div:nth-child(3)").removeClass("r2");

            hidden = true;

        }
    })
})
