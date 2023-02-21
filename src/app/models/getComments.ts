export interface User {
    id: number;
    name: string;
    user_name: string;
    poster_url: string;
  }
  
  export interface Comment {
    id: number;
    user: User;
    film_id: number;
    body: string;
    created_at: string;
    likes_count: number;
    dislikes_count: number;
    parent_id?: number;
    answers?: Comment[];
  }
  
 export interface Like {
    id: number;
    user_id: number;
    comment_id: number;
    is_like: boolean;
    created_at: string;
    updated_at: string;
  }
  
  export interface Pagination {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
  }
  
  export interface Data {
    items: Comment[];
    pagination: Pagination;
  }
  
  export interface CommentResult {
    state: boolean;
    data: Data;
    like?: Like; // Добавленное поле
  }