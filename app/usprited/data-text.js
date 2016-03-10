export default class DataText {
  static toCSS(data) {
    let res = '';

    for (let i = 0; i < data.length; i++) {
      let item = data[i];

      res += `.${item.name} {
  background-position: -${item.x} -${item.y};
  width: ${item.w}px;
  height: ${item.h}px;
}
`;
    }

    return res;
  }


  static toJSON(data) {
    let res = new Array(data.length);

    for (let i = 0; i < data.length; i++) {
      res[i] = {
          name : data[i].name,
          x    : data[i].x,
          y    : data[i].y,
          w    : data[i].w,
          h    : data[i].h
        };
    }

    return JSON.stringify(res);
  }
}
