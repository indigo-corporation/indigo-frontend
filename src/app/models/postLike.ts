export interface User {
    id: number;
    name: string;
    user_name: string;
    poster_url: string;
  }
  
  export interface Like {
    id: number;
    user: User;
    comment_id: number;
    is_like: boolean;
    created_at: string;
  }
  
  export interface Comment {
    id: number;
    body: string;
    parent_id?: number;
    user: User;
    film_id: string;
    created_at: string;
    dislikes_count: number;
    likes_count: number;
    like: Like | null;
  }
  
  export interface postLike {
    data: Comment;
    state: boolean;
  }