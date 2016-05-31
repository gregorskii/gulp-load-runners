/**
 * Helpers
 * @module helpers
 * @see module:helpers
 */

/**
 * @description Throws an error when a mandatory field is not found
 * @returns {null} void
 */
export const mandatory = () => {
  throw new Error('Missing parameter');
};
