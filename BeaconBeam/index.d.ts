/**
 * Renders a beacon beam at the specified position.
 * @param x - The x-coordinate of the beam.
 * @param y - The y-coordinate of the beam.
 * @param z - The z-coordinate of the beam.
 * @param r - The red color component of the beam.
 * @param g - The green color component of the beam.
 * @param b - The blue color component of the beam.
 * @param alpha - The alpha value of the beam.
 * @param depthCheck - Whether the beam should be depth checked.
 * @param height - The height of the beam.
 */
declare function renderBeaconBeam2(
  x: number,
  y: number,
  z: number,
  r: number,
  g: number,
  b: number,
  alpha: number,
  depthCheck: boolean,
  height?: number,
): void;

export default renderBeaconBeam2;
