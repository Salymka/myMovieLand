export function getFavoriteMovies(): number[] {
    const storedFavorites = localStorage.getItem('favoriteMovies');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
}

export function addMovieToFavorites(movieId: number): void {
    const favoriteMovies = getFavoriteMovies();
    if (!favoriteMovies.includes(movieId)) {
        favoriteMovies.push(movieId);
        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    } else {
        removeMovieFromFavorites(movieId);
    }
}

export function removeMovieFromFavorites(movieId: number): void {
    const favoriteMovies = getFavoriteMovies();

    // Check if the movie is in favorites
    const index = favoriteMovies.indexOf(movieId);
    if (index !== -1) {
        favoriteMovies.splice(index, 1);
        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    }
}
