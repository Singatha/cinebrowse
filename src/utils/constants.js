export const SLIDER_SETTINGS = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    responsive: [
        {
            breakpoint: 1200,
            settings: { slidesToShow: 5, slidesToScroll: 5 },
        },
        {
            breakpoint: 900,
            settings: { slidesToShow: 4, slidesToScroll: 4 },
        },
        {
            breakpoint: 700,
            settings: { slidesToShow: 3, slidesToScroll: 3 },
        },
        {
            breakpoint: 480,
            settings: { slidesToShow: 2, slidesToScroll: 2 },
        },
    ],
};

export const PARAM_NAMES = {
    TV: 'tv',
    MOVIES: 'movies',
    FAVOURITE_MOVIES: 'favourite-movies',
    FAVOURITE_TV_SERIES: 'favourite-tv-series',
};

export const GENRES =  {
    10759: "Action & Adventure",
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10762: "Kids",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10765: "Sci-Fi & Fantasy",
    10766: "Soap",
    10767: "Talk",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    10768: "War & Politics",
    37: "Western"
};
