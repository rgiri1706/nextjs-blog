export interface Post {
    _createdAt: string;
    _id: string;
    author: {
      _id: string;
      bio: string;
      image: string;
      name: string;
    };
    category: string;
    description: string | null;
    image: string;
    slug: {
      _type: string;
      current: string;
    };
    title: string;
    views: number | null;
}

export interface PrevState {
  error: string;
  status: 'INITIAL' | 'SUCCESS' | 'ERROR' ;
}
