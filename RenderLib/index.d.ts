declare class RenderLib {
  /**
   * Draws the frame of a box
   * @param {number} x - X Coordinates
   * @param {number} y - Y Coordinates
   * @param {number} z - Z Coordinates
   * @param {number} w - Box Width
   * @param {number} h - Box Height
   * @param {number} red - Box Color Red 0-1
   * @param {number} green - Box Color Green 0-1
   * @param {number} blue - Box Color Blue 0-1
   * @param {number} alpha - Box Color Alpha 0-1
   * @param {boolean} phase - Depth test disabled. True: See through walls
   */
  static drawEspBox(
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    red: number,
    green: number,
    blue: number,
    alpha: number,
    phase: boolean,
  ): void;

  /**
   * Draws the filled sides of a box
   * @param {number} x - X Coordinates
   * @param {number} y - Y Coordinates
   * @param {number} z - Z Coordinates
   * @param {number} w - Box Width
   * @param {number} h - Box Height
   * @param {number} red - Box Color Red 0-1
   * @param {number} green - Box Color Green 0-1
   * @param {number} blue - Box Color Blue 0-1
   * @param {number} alpha - Box Color Alpha 0-1
   * @param {boolean} phase - Depth test disabled. True: See through walls
   */
  static drawInnerEspBox(
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    red: number,
    green: number,
    blue: number,
    alpha: number,
    phase: boolean,
  ): void;

  /**
   * Draws a box like baritone with the top and bottom going up and down smoothly
   * @param {number} x - X Coordinates
   * @param {number} y - Y Coordinates
   * @param {number} z - Z Coordinates
   * @param {number} w - Box Width
   * @param {number} h - Box Height
   * @param {number} red - Box Color Red 0-1
   * @param {number} green - Box Color Green 0-1
   * @param {number} blue - Box Color Blue 0-1
   * @param {number} alpha - Box Color ALpha 0-1
   * @param {boolean} phase - Depth test disabled. True: See through walls
   */
  static drawBaritoneEspBox(
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    red: number,
    green: number,
    blue: number,
    alpha: number,
    phase: boolean,
  ): void;

  /**
   * Draws a sphere
   * More Info: http://legacy.lwjgl.org/javadoc/org/lwjgl/util/glu/Sphere.html
   * @param {number} x - X Coordinates
   * @param {number} y - Y Coordinates
   * @param {number} z - Z Coordinates
   * @param {number} radius - Radius of the sphere
   * @param {number} slices - How many slices the sphere should have. Figure it out.
   * @param {number} stacks - How many stacks the sphere should have. Figure it out.
   * @param {number} rot1 - Rotation on X axis.
   * @param {number} rot2 - Rotation on Y axis.
   * @param {number} rot3 - Rotation on Z axis.
   * @param {number} r - Box Color Red 0-1
   * @param {number} g - Box Color Green 0-1
   * @param {number} b - Box Color Blue 0-1
   * @param {number} a - Box Color Alpha 0-1
   * @param {boolean} phase - Depth test disabled. True: See through walls
   * @param {boolean} linemode - True: the frame of the sphere is visible. False: the filled sphere is visible.
   */
  static drawSphere(
    x: number,
    y: number,
    z: number,
    radius: number,
    slices: number,
    stacks: number,
    rot1: number,
    rot2: number,
    rot3: number,
    r: number,
    g: number,
    b: number,
    a: number,
    phase: boolean,
    linemode: boolean,
  ): void;

  /**
   * Draws a 3D cylinder
   * More Info: http://legacy.lwjgl.org/javadoc/org/lwjgl/util/glu/Cylinder.html
   * @param {number} x - X Coordinates
   * @param {number} y - Y Coordinates
   * @param {number} z - Z Coordinates
   * @param {number} baseRadius - Radius of the bottom of the cylinder.
   * @param {number} topRadius - Radius of the top of the cylinder.
   * @param {number} height - Height of the cylinder.
   * @param {number} slices - Slices in the cylinder. I don't know what this means just figure it out.
   * @param {number} stacks - Stacks in the cylinder. I don't know what this means just figure it out.
   * @param {number} rot1 - Rotation on X axis.
   * @param {number} rot2 - Rotation on Y axis.
   * @param {number} rot3 - Rotation on Z axis.
   * @param {number} r - Box Color Red 0-1
   * @param {number} g - Box Color Green 0-1
   * @param {number} b - Box Color Blue 0-1
   * @param {number} a - Box Color Alpha 0-1
   * @param {boolean} phase - Depth test disabled. True: See through walls
   * @param {boolean} linemode - True: the frame of the cylinder is visible. False: the filled cylinder is visible.
   */
  static drawCyl: (
    x: number,
    y: number,
    z: number,
    baseRadius: number,
    topRadius: number,
    height: number,
    slices: number,
    stacks: number,
    rot1: number,
    rot2: number,
    rot3: number,
    r: number,
    g: number,
    b: number,
    a: number,
    phase: boolean,
    linemode: boolean,
  ) => void;

  /**
   * Draws a flat disk.
   * More Info: http://legacy.lwjgl.org/javadoc/org/lwjgl/util/glu/Disk.html
   * @param {number} x - X Coordinates
   * @param {number} y - Y Coordinates
   * @param {number} z - Z Coordinates
   * @param {number} innerRadius - Radius of the smaller circle inside the disk. If you want it to be filled set to 0.
   * @param {number} outerRadius - Radius of the disk.
   * @param {number} slices - Slices in the disk. I don't know what this means just figure it out.
   * @param {number} loops - I don't know.
   * @param {number} rot1 - Rotation on X axis.
   * @param {number} rot2 - Rotation on Y axis.
   * @param {number} rot3 - Rotation on Z axis.
   * @param {number} r - Box Color Red 0-1
   * @param {number} g - Box Color Green 0-1
   * @param {number} b - Box Color Blue 0-1
   * @param {number} a - Box Color Alpha 0-1
   * @param {boolean} phase - Depth test disabled. True: See through walls
   * @param {boolean} linemode - True: the frame of the disk is visible. False: the filled disk is visible.
   */
  static drawDisk: (
    x: number,
    y: number,
    z: number,
    innerRadius: number,
    outerRadius: number,
    slices: number,
    loops: number,
    rot1: number,
    rot2: number,
    rot3: number,
    r: number,
    g: number,
    b: number,
    a: number,
    phase: boolean,
    linemode: boolean,
  ) => void;
}

export default RenderLib;
