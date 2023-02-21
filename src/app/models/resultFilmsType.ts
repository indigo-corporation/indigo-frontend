export interface Item {
    id: number;
    original_title: string;
    original_language: string | null;
    imdb_id: string;
    imdb_rating: string;
    is_anime: boolean;
    is_serial: boolean;
    overview: string;
    poster_url: string;
    release_date: string;
    runtime: number | null;
    shiki_id: number | null;
    shiki_rating: number | null;
    slug: string;
    stars: number[] | null;
    title: string;
    year: number;
}

export interface Country {
    id: number;
    name: string;
    title: string;
}

export interface Genre {
    id: number;
    name: string;
    slug: string;
    title: string | null;
}

export interface Pagination {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
}

export interface Data {
    items: Item[];
    countries: Country[];
    genres: Genre[];
    pagination: Pagination;
}

export interface Result {
    state: boolean;
    data: Data;
    category: string;
}