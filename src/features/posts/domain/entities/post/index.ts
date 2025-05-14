/**
 * Represents a post entity with basic personal information.
 *
 * @property {string} id - The unique identifier for the post.
 * @property {string} title - The title of the post.
 * @property {string} description - The description of the post.
 * @property {string} createDate - The create date of the post, stored as a string in ISO 8601 format.
 * @property {number} likes - The likes of the post.
 */
export class PostEntity {
  id: string;
  title: string;
  description: string;
  createDate: string;
  likes: number;

  constructor(
    id: string,
    title: string,
    description: string,
    createDate: string,
    likes: number
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createDate = createDate;
    this.likes = likes;
  }
}