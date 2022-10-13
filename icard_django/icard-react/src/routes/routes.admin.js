import {AdminLayout} from '../layouts';
import {OrdesAdmin, UsersAdmin, CategoriesAdmin, ProductsAdmin, TablesAdmin, TablesDetails, PaymentsHistory} from '../pages/Admin';

const routesAdmin = [
    {
        path: '/admin',
        layout: AdminLayout,
        component: OrdesAdmin
    },
    {
        path: '/admin/usuarios',
        layout: AdminLayout,
        component: UsersAdmin
    },
    {
        path: '/admin/categorias',
        layout: AdminLayout,
        component: CategoriesAdmin
    },
    {
        path: '/admin/productos',
        layout: AdminLayout,
        component: ProductsAdmin
    },
    {
        path: '/admin/mesas',
        layout: AdminLayout,
        component: TablesAdmin
    },
    {
        path: '/admin/mesa/:id',
        layout: AdminLayout,
        component: TablesDetails
    },
    {
        path: '/admin/historial',
        layout: AdminLayout,
        component: PaymentsHistory
    }
];

export default routesAdmin;