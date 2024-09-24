export const transformDetailsInfo = data => {
    const { poster_path, title, release_date, vote_average, overview, genres } =
      data;
    return {
      poster_path,
      title,
      release_date,
      vote_average,
      overview,
      genres,
    };
};