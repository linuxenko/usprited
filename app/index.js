import './screen/style/index.less';
import React from 'react';
import DOM from 'react-dom';
import Screen from './screen/screen';
import Handler from 'usprited/handler';

import Icon from 'screen/image/icon.png';


Handler.emit('application-onload');

let link = document.createElement('link');
   link.type = 'image/x-icon';
   link.rel = 'shortcut icon';
   link.href = Icon;
   document.getElementsByTagName('head')[0].appendChild(link);

let app = document.createElement('div');
app.className = 'app';
document.body.appendChild(app);

DOM.render(<Screen />, app);
