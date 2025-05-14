import { PostModel } from "@posts/data/models/post";

/**
 * Represents the response model for a list of posts, including pagination information.
 *
 * This model encapsulates the data returned from post-related queries, including:
 * - Pagination metadata (`limit`, `skip`, `total`).
 * - The list of posts as an array of `PostModel`.
 *
 * @class
 */
export class PostResponseModel {
  limit: number;
  skip: number;
  total: number;
  posts: PostModel[];

  constructor(limit: number, skip: number, total: number, posts: PostModel[]) {
    this.limit = limit;
    this.skip = skip;
    this.total = total;
    this.posts = posts;
  }
}