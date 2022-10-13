import routerAdmin from './routes.admin';
import routerClient from './routes.client';
import routesDelivery from '../routes/routes.delivery'
import {BasicLayout} from '../layouts'
import Error404 from '../pages/Error404';

const routes = [ ...routerAdmin, ...routerClient, ...routesDelivery, {
    layout: BasicLayout,
    component: Error404
} ];

export default routes;

