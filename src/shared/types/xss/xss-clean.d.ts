/**
 * Module declaration for 'xss-clean'.
 *
 * This file provides TypeScript type definitions for the 'xss-clean' package,
 * which lacks official type declarations. It allows the TypeScript compiler
 * to understand the module and provide proper type checking and IntelliSense.
 *
 * The `xss-clean` middleware is used in Express applications to sanitize user
 * input coming from the request body, query string, and URL parameters,
 * helping to prevent Cross-Site Scripting (XSS) attacks.
 *
 * @module 'xss-clean'
 */

declare module 'xss-clean' {
  import { RequestHandler } from 'express';

  /**
   * Returns an Express middleware that sanitizes input against XSS attacks.
   *
   * @returns {RequestHandler} An Express-compatible middleware function.
   */
  const xssClean: () => RequestHandler;

  export default xssClean;
}
