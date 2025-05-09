import swaggerJSDoc from 'swagger-jsdoc';

/**
 * Swagger configuration options for generating API documentation.
 * 
 * @type {swaggerJSDoc.Options}
 */
export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0', // OpenAPI version
    info: {
      title: 'API Users', // API title
      version: '1.0.0', // API version
      description: 'Swagger documentation for the Users API', // API description
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT ?? 3100}`, // Base URL for the API
        description: 'Local server', // Description for the server
      },
    ],
  },
  apis: ['./src/**/*.ts'], // Paths to the API route files containing Swagger annotations
};

/**
 * Swagger specification object generated based on the options provided.
 * This object is used by Swagger UI to render the API documentation.
 */
export const swaggerSpec = swaggerJSDoc(swaggerOptions);

