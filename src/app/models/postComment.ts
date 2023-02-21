export interface User {
    id: number;
    name: string;
    user_name: string;
  }
  
  export interface postComment {
    state: boolean;
    data: {
      id: number;
      user: User;
      film_id: string;
    };
    body: string;
    created_at: string;
    dislikes_count: number;
    film_id: string;
    id: number;
    like: null | boolean;
    likes_count: number;
    parent_id: number;
    user: User;
    name: string;
    poster_url: string;
    user_name: string;
  }