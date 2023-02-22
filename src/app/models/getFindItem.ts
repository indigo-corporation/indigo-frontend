export interface getFindItem {
    state: boolean;
    data: Data;
  }
  
  interface Data {
    id: number;
    original_title: string;
    original_language: string;
    imdb_id: string;
    imdb_rating: string;
    is_anime: boolean;
    is_serial: boolean;
    overview: string;
    poster_url: string;
    release_date: string;
    runtime: number;
    shiki_id: string;
    shiki_rating: string;
    slug: string;
    stars: any;
    title: string;
    year: number;
    category: string;
    countries: Country[];
    genres: Genre[];
  }
  
  interface Country {
    id: number;
    name: string;
    title: string;
  }
  
  interface Genre {
    id: number;
    name: string;
    slug: string;
    title: string;
  }