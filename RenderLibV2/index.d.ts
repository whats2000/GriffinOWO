import RenderLib from '../RenderLib';

declare class RenderLibV2 extends RenderLib {
  /**
   * Draws the frame of a box with customizable width in the X and Z directions
   * @param {number} x - X Coordinates
   * @param {number} y - Y Coordinates
   * @param {number} z - Z Coordinates
   * @param {number} wx - Box Width in X direction
   * @param {number} h - Box Height
   * @param {number} wz - Box Width in Z direction
   * @param {number} red - Box Color Red 0-1
   * @param {number} green - Box Color Green 0-1
   * @param {number} blue - Box Color Blue 0-1
   * @param {number} alpha - Box Color Alpha 0-1
   * @param {boolean} phase - Depth test disabled. True: See through walls
   * @param {number} [lineWidth=2.0] - The line width in float. if this parameter not pass, default is 2.0
   */
  static drawEspBoxV2: (
    x: number,
    y: number,
    z: number,
    wx: number,
    h: number,
    wz: number,
    red: number,
    green: number,
    blue: number,
    alpha: number,
    phase: boolean,
    lineWidth?: number,
  ) => void;

  /**
   * Draws the filled sides of a box with customizable width in the X and Z directions
   * @param {number} x - X Coordinates
   * @param {number} y - Y Coordinates
   * @param {number} z - Z Coordinates
   * @param {number} wx - Box Width in X direction
   * @param {number} h - Box Height
   * @param {number} wz - Box Width in Z direction
   * @param {number} red - Box Color Red 0-1
   * @param {number} green - Box Color Green 0-1
   * @param {number} blue - Box Color Blue 0-1
   * @param {number} alpha - Box Color Alpha 0-1
   * @param {boolean} phase - Depth test disabled. True: See through walls
   */
  static drawInnerEspBoxV2: (
    x: number,
    y: number,
    z: number,
    wx: number,
    h: number,
    wz: number,
    red: number,
    green: number,
    blue: number,
    alpha: number,
    phase: boolean,
  ) => void;

  /**
   * Draws a box like baritone with the top and bottom going up and down smoothly
   * @param {number} x - X Coordinates
   * @param {number} y - Y Coordinates
   * @param {number} z - Z Coordinates
   * @param {number} w1 - Box Width in X direction
   * @param {number} h - Box Height
   * @param {number} w2 - Box Width in Z direction
   * @param {number} red - Box Color Red 0-1
   * @param {number} green - Box Color Green 0-1
   * @param {number} blue - Box Color Blue 0-1
   * @param {number} alpha - Box Color Alpha 0-1
   * @param {boolean} phase - Depth test disabled. True: See through walls
   * @param {number} [lineWidth=2.0] - The line width in float. if this parameter not pass, default is 2.0
   */
  static drawBaritoneEspBoxV2: (
    x: number,
    y: number,
    z: number,
    w1: number,
    h: number,
    w2: number,
    red: number,
    green: number,
    blue: number,
    alpha: number,
    phase: boolean,
    lineWidth?: number,
  ) => void;

  /**
   * Draws the filled sides of a box like baritone with the top and bottom going up and down smoothly
   * @param {number} x - X Coordinates
   * @param {number} y - Y Coordinates
   * @param {number} z - Z Coordinates
   * @param {number} wx - Box Width in X direction
   * @param {number} h - Box Height
   * @param {number} wz - Box Width in Z direction
   * @param {number} red - Box Color Red 0-1
   * @param {number} green - Box Color Green 0-1
   * @param {number} blue - Box Color Blue 0-1
   * @param {number} alpha - Box Color Alpha 0-1
   * @param {boolean} phase - Depth test disabled. True: See through walls
   */
  static drawInnerBaritoneEspBoxV2: (
    x: number,
    y: number,
    z: number,
    wx: number,
    h: number,
    wz: number,
    red: number,
    green: number,
    blue: number,
    alpha: number,
    phase: boolean,
  ) => void;

  /**
   * Draws a line between 2 coordinates
   * @param {number} x1 - X Coordinates of first position
   * @param {number} y1 - Y Coordinates of first position
   * @param {number} z1 - Z Coordinates of first position
   * @param {number} x2 - X Coordinates of second position
   * @param {number} y2 - Y Coordinates of second position
   * @param {number} z2 - Z Coordinates of second position
   * @param {number} red - Line Color Red 0-1
   * @param {number} green - Line Color Green 0-1
   * @param {number} blue - Line Color Blue 0-1
   * @param {number} alpha - Line Color Alpha 0-1
   * @param {boolean} phase - Depth test disabled. True: See through walls
   * @param {number} [lineWidth=2.0] - The line width in float. if this parameter not pass, default is 2.0
   */
  static drawLine: (
    x1: number,
    y1: number,
    z1: number,
    x2: number,
    y2: number,
    z2: number,
    red: number,
    green: number,
    blue: number,
    alpha: number,
    phase: boolean,
    lineWidth?: number,
  ) => void;

  /**
   * Calculate the box render parameter by providing 2 coordinates
   * @param {number} x1 - X Coordinates of first position
   * @param {number} y1 - Y Coordinates of first position
   * @param {number} z1 - Z Coordinates of first position
   * @param {number} x2 - X Coordinates of second position
   * @param {number} y2 - Y Coordinates of second position
   * @param {number} z2 - Z Coordinates of second position
   *
   * @returns {Object} An object containing center coordinates and dimensions.
   * - `cx`: The x-coordinate of the center of the box.
   * - `cy`: The y-coordinate of the center of the box, taken as the lower of the two y-coordinates provided.
   * - `cz`: The z-coordinate of the center of the box.
   * - `wx`: The width of the box in the x-direction.
   * - `h`: The height of the box.
   * - `wz`: The width of the box in the z-direction.
   */
  static calculateCenter: (
    x1: number,
    y1: number,
    z1: number,
    x2: number,
    y2: number,
    z2: number,
  ) => {
    cx: number;
    cy: number;
    cz: number;
    wx: number;
    h: number;
    wz: number;
  };

  /**
   * Retrieves the RGBA values of the provided color object.
   * @param {Object|string|Array} color - The color to be retrieved. Alpha default is 1, It can be one of the following types:
   * - Java.type("java.awt.Color")
   * - string representation of a color (e.g., "#RRGGBB" or "#RRGGBBAA")
   * - Array of color [r, g, b, a] or [r, g, b]. (In the range 0 to 255)
   *
   * @returns {Object} An object containing the RGBA values of the color.
   * - `red`: The red component of the color in the range 0 to 1.
   * - `green`: The green component of the color in the range 0 to 1.
   * - `blue`: The blue component of the color in the range 0 to 1.
   * - `alpha`: The alpha (opacity) component of the color in the range 0 to 1.
   */
  static getColor: (color: Object | string | Array<number>) => {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  };
}

export default RenderLibV2;
