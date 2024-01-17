import { MovieFullData, MovieShortData } from '../api/types';

export function mapMovieData(movies: MovieFullData[]): MovieShortData[] {
    return movies.map((movie) => ({
        id: movie.id,
        release_date: movie.release_date,
        overview: movie.overview,
        poster_path: movie.poster_path,
        original_title: movie.original_title,
    }));
}
