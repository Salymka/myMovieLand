export interface MovieFullData {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MovieShortData {
    id: number;
    release_date: string;
    overview: string;
    poster_path: string;
    original_title: string;
}

export interface Movielist {
    page: number;
    results: MovieFullData[];
}

export enum MovieListType {
    UPCOMING = 'upcoming',
    TOP_RATED = 'top_rated',
    POPULAR = 'popular',
    SEARCH = 'search',
}
