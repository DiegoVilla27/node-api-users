/**
 * Represents a post model with properties and methods to convert to different formats.
 *
 * @property {string} id - The unique identifier for the post.
 * @property {string} title - The title of the post.
 * @property {string} description - The description of the post.
 * @property {string} createDate - The create date of the post, stored as a string in ISO 8601 format.
 * @property {number} likes - The likes of the post.
*/
export class PostModel {
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

  /**
   * Converts the current instance of the post to a plain JavaScript object.
   *
   * This method is used to transform the instance properties of a class (or object)
   * into a simple JavaScript object that can be easily serialized or returned
   * in API responses. The `toJSON()` method excludes any methods and returns
   * only the essential post data.
   * 
   * **Returns:**
   * - A plain object containing the post's properties, formatted for JSON serialization.
   * 
   * **Returned Object Structure:**
   * - `id`: The unique identifier for the post.
   * - `title`: The post's title.
   * - `description`: The post's description.
   * - `createDate`: The post's create date, formatted as a string (yyyy-MM-dd).
   * - `likes`: The post's likes.
   */
  toJSON(): object {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      createDate: this.createDate,
      likes: this.likes
    }
  }
}