import generate  from '../controller/app.controller.js';

const route = (app) => {
    app.get('/generate/:age', generate);
}

export default route;