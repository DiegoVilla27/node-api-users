import { PostEntity } from '@posts/domain/entities/post';
/**
 * Represents a response entity for post data.
 * 
 * @property {number} limit - The maximum number of posts to return.
 * @property {number} skip - The number of posts to skip before starting to collect the result set.
 * @property {number} total - The total number of posts available.
 * @property {PostEntity[]} posts - An array of post entities.
 */
export class PostResponseEntity {
  limit: number;
  skip: number;
  total: number;
  posts: PostEntity[];

  constructor(limit: number, skip: number, total: number, posts: PostEntity[]) {
    this.limit = limit;
    this.skip = skip;
    this.total = total;
    this.posts = posts;
  }
}