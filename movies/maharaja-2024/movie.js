var baseUrl = window.location.origin;

var options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzM5NzQwMjk2YTdkNWU5YTRlYjhlZjU1ODZiMzJjMiIsIm5iZiI6MTcyMzA5NjQ1Ni4wMTE2MzksInN1YiI6IjY2YTcyZWU0YWNkYzZjZGFmYWIxOWRhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TDXBSYS4CWW-MH2DE14gYRHQ5mV_un9foW8rhfWAnf8'
    }
};

$(document).ready(function() {

    fetch('https://api.themoviedb.org/3/search/movie?query=maharaja&include_adult=false&language=en-US&page=1&year=2024', options)
    .then(response => response.json())
    .then(response => {
        response = response.results[0];
        let iframe = document.getElementById("show");
        iframe.src = `https://vidsrc.net/embed/movie?tmdb=${response.id}`;

        let imgContainer = document.getElementById("image-container");
        let img = new Image();
        let url = `https://image.tmdb.org/t/p/w400${response.poster_path}`;
        img.src = url;
        img.onload = function() {
            imgContainer.insertAdjacentHTML("afterbegin", `
            <img src="https://image.tmdb.org/t/p/w400${response.poster_path}" alt="${response.title}">`);
        }

        $("#movie-title").html(response.title);

        fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
        .then(response2 => response2.json())
        .then(response2 => {
            response2 = response2.genres;
            let genresContainer = document.getElementById("genres");
            for (let i = 0; i < response2.length; i++) {
                for (let j = 0; j < response.genre_ids.length; j++) {
                    if (response2[i].id == response.genre_ids[j]) {
                        genresContainer.insertAdjacentHTML("afterbegin", `
                        <div>${response2[i].name}</div>`);
                    }
                }
            }
            
        })
    })

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

    $(".logo-container, .home").click(function(event){
        event.stopImmediatePropagation();
        window.open(baseUrl, "_self");
    })

    let hidden = true;
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
})
