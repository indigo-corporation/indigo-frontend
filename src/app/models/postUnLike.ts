interface unLikeModel {
    like: null | unknown;
    likes_count: number;
    dislikes_count: number;
  }
  
 export interface postUnLike {
    data: unLikeModel;
    state: boolean;
  }