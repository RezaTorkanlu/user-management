export type Posts = {
  id: number;
  title: string;
  body: string;
}

export type UpdatePost = Partial<Omit<Posts, 'id'>>
export type NewPost = Omit<Posts , 'id'>