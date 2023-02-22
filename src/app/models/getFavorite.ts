interface Genre {
    id: number;
    name: string;
    slug: string;
    title: string;
  }
  
  interface Item {
    id: number;
    category: string;
    genres: Genre[];
    imdb_rating: string;
    overview: string;
    poster_url: string;
    shiki_rating: string;
    slug: string;
    title: string;
    year: number;
  }
  
  interface Pagination {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
  }
  
  interface Data {
    items: Item[];
    pagination: Pagination;
  }
  
 export interface getFavorite {
    state: boolean;
    data: Data;
  }