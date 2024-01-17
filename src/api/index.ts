import { Movielist } from './types';

const apiKey: string =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YmM1NDJiMzMyODEyODliMDdhMTM2ZWE4MDQ5ZGU0NyIsInN1YiI6IjY1YTZjNzdmMTc0OTczMDEyZjI2NzIyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A3tCl60xWfEPF2I9BvR8tA8F_By4_gbYtUdlsiLz1js';

const baseURL: string = 'https://api.themoviedb.org/3/';

// Функція для виконання GET-запитів
async function get<T>(url: string): Promise<T> {
    try {
        const response = await fetch(`${baseURL}/${url}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
        });

        const data: T = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Failed to fetch data from ${url}: ${error.message}`);
    }
}

// Функція для отримання списку фільмів за назвою
export function searchMoviesByName(query: string, page: number | string) {
    return get<Movielist>(`search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`);
}

// Функція для отримання списку популярних фільмів
export function getPopularMovies(page: number | string) {
    return get<Movielist>(
        `discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`
    );
}

// Функція для отримання списку найвище оцінених фільмів
export function getTopRatedMovies(page: number | string) {
    return get<Movielist>(`movie/top_rated?language=en-US&page=${page}`);
}

// Функція для отримання списку майбутніх фільмів
export function getUpcomingMovies(page: number | string) {
    return get<Movielist>(`movie/upcoming?language=en-US&page=${page}`);
}
