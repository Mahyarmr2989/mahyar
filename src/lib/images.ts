/**
 * Pexels image URL helper.
 * Usage: px(5352628, 800) => a compressed, width-constrained JPEG.
 */
export function px(id: number, w = 800): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
}

/** A square-ish crop variant for gallery thumbnails / instagram tiles. */
export function pxSquare(id: number, w = 600): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${w}`;
}
