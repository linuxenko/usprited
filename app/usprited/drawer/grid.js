
export default class Grid {
  static image(color) {
    let canvas = document.createElement('canvas');
    canvas.width = 10;
    canvas.height = 10;
    let ctx = canvas.getContext('2d');
    if (color === 'white') {
      Grid.whiteGrid(ctx, 10, 10);
    } else {
      Grid.darkGrid(ctx, 10, 10);
    }
    return canvas.toDataURL();
  }

  static whiteGrid(ctx, w, h) {
    Grid.grid(ctx, w, h, "#fff", "#e3e3e3");
  }

  static darkGrid(ctx, w, h) {
    Grid.grid(ctx, w, h, "#2b2b2b", "#000");
  }

  static grid(ctx, w, h, bg, fg) {
    ctx.save();

    ctx.fillStyle = bg;
    ctx.fillRect(0,0, w, h);

    for (let x = 0; x < w; x += 10) {
      for (let y = 0; y < h; y += 10) {
        ctx.fillStyle = fg;
        ctx.fillRect(x, y, 5, 5);
        ctx.fillRect(x + 5, y + 5, 5, 5);
      }
    }

    ctx.restore();
  }
}
