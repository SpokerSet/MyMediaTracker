export type MovieItem = {
  id: string;
  title: string;
  type: 'movie' | 'series';
  notes: string;
  poster: string | null;
  imdbRating: string | null;
  userRating: number | null;
  watched: boolean;
};

export type OmdbSearchResult = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type OmdbDetail = {
  Title: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  Type: 'movie' | 'series';
};