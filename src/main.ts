/* eslint-disable import/extensions */
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/styles.css';
import { MovieShortData, MovieListType } from './api/types.ts';
import { addMovieToFavorites, getFavoriteMovies } from './sevices/localStorage.ts';
import { cardConstructor } from './sevices/constructor.ts';
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies, searchMoviesByName } from './api/index.ts';
import { mapMovieData } from './mapper/index.ts';

let movieList: MovieShortData[] = [];
let page: number = 1;
let movieListType: MovieListType = MovieListType.POPULAR;
let querySearch: string = '';

document.addEventListener('DOMContentLoaded', async () => {
    // Code to execute after the page has fully loaded
    try {
        const radioButtons = document.querySelectorAll('.btn-check');
        radioButtons.forEach((button) => {
            button.addEventListener('change', handleRadioButtonChange);
        });

        const searchButton = document.getElementById('search-submit');
        if (searchButton) {
            searchButton.addEventListener('click', handleSearchButtonClick);
        }

        const loadMoreButton = document.getElementById('load-more');
        if (loadMoreButton) {
            loadMoreButton.addEventListener('click', handleLoadMoreClick);
        }

        addEventListenerForSVG();
        await getMoviesByListType();
        setRandomMovieToHeader();
    } catch (error) {
        throw new Error(`${error.message}`);
    }
});

// get data by type of buttons or search

async function getMoviesByListType(loadMore: boolean = false): Promise<void> {
    if (loadMore) {
        page += 1;
    }
    switch (movieListType) {
        case MovieListType.UPCOMING: {
            const upmovies = await getUpcomingMovies(page);
            movieList = mapMovieData(upmovies.results);
            addMoviesToContainer(loadMore);
            break;
        }
        case MovieListType.TOP_RATED: {
            const tpmovies = await getTopRatedMovies(page);
            movieList = mapMovieData(tpmovies.results);
            addMoviesToContainer(loadMore);
            break;
        }
        case MovieListType.POPULAR: {
            const ppmovies = await getPopularMovies(page);
            movieList = mapMovieData(ppmovies.results);
            addMoviesToContainer(loadMore);
            break;
        }
        case MovieListType.SEARCH: {
            const srmovies = await searchMoviesByName(querySearch, page);
            movieList = mapMovieData(srmovies.results);
            addMoviesToContainer(loadMore);
            break;
        }
        default:
            movieListType = MovieListType.POPULAR;
            getMoviesByListType();
    }
}

// listener for svg

function addEventListenerForSVG() {
    const svgElements = document.querySelectorAll('.bi-heart-fill');
    const favorites = getFavoriteMovies();
    svgElements.forEach((svgElement) => {
        const svgElementWithStyle = svgElement as SVGElement;
        svgElement.removeEventListener('click', handleSvgClick);
        svgElement.addEventListener('click', handleSvgClick);
        const parentCard = svgElement.closest('.card');
        const parentId = parentCard?.id;

        if (parentId) {
            const isFavorite = favorites.includes(+parentId);
            svgElementWithStyle.style.fill = isFavorite ? 'red' : '#ff000078';
        }
    });
}

// handlers

function handleLoadMoreClick() {
    getMoviesByListType(true);
}

function handleSvgClick(event: Event) {
    const svgElement = event.currentTarget as SVGSVGElement;
    const parentCard = svgElement.closest('.card');
    const parentId = parentCard?.id;
    if (parentId) {
        addMovieToFavorites(+parentId);
    }
    addEventListenerForSVG();
}

async function handleSearchButtonClick() {
    const searchInput = document.getElementById('search') as HTMLInputElement;
    querySearch = searchInput.value;

    movieListType = MovieListType.SEARCH;
    await getMoviesByListType();
}

function setRandomMovieToHeader() {
    const movie = movieList[Math.floor(Math.random() * 20)];
    const headerTitle = document.getElementById('random-movie-name');
    const headerdesc = document.getElementById('random-movie-description');
    if (headerTitle && headerdesc) {
        headerTitle.innerHTML = movie.original_title;
        headerdesc.innerHTML = movie.overview;
    }
}

function handleRadioButtonChange(event: Event) {
    const selectedButtonId = (event.target as HTMLInputElement).id;
    switch (selectedButtonId) {
        case MovieListType.UPCOMING:
            movieListType = MovieListType.UPCOMING;
            getMoviesByListType();
            break;
        case MovieListType.TOP_RATED:
            movieListType = MovieListType.TOP_RATED;
            getMoviesByListType();
            break;
        case MovieListType.POPULAR:
            movieListType = MovieListType.POPULAR;
            getMoviesByListType();
            break;
        default:
            movieListType = MovieListType.POPULAR;
            getMoviesByListType();
    }
}

// constructor add cards to main page

function addMoviesToContainer(moreCards: boolean = false) {
    const filmContainer = document.getElementById('film-container');

    if (filmContainer) {
        if (!moreCards) {
            filmContainer.innerHTML = '';
            page = 1;
        }
        movieList.forEach((movie) => {
            const movieElement = document.createElement('div');
            movieElement.className = 'col-lg-3 col-md-4 col-12 p-2';

            movieElement.innerHTML = cardConstructor(movie.id, movie.poster_path, movie.overview, movie.release_date);

            filmContainer.appendChild(movieElement);
        });
    }
    addEventListenerForSVG();
}

// ! add constructor to add cards to favorites

// function addMoviesToFavoritesContainer() {}
