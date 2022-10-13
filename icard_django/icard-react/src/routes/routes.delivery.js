import { DeliveryLayout } from '../layouts'
import { DeliveryAdmin, CartDelivery } from '../pages/Delivery'

const routesDelivery = [
    {
        path: '/domicilios',
        layout: DeliveryLayout,
        component: DeliveryAdmin
    },
    {
        path: '/domicilios/carrito',
        layout: DeliveryLayout,
        component: CartDelivery
    },
]

export default routesDelivery;