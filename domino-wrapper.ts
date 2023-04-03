import { readFileSync } from 'fs';
import { join } from 'path';
import * as domino from 'domino';

const template = readFileSync(join('dist/front-end/browser', 'index.html')).toString();
const win = domino.createWindow(template);

// Заполняем глобальный объект `window` данными, которые нам нужны на стороне сервера
(global as any)['window'] = win;
(global as any)['document'] = win.document;
(global as any)['sessionStorage'] = win.sessionStorage;
