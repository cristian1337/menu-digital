import React from 'react';
import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import AppNavLink, {} from '../../../utils/AppNavLink';
import { useAuth } from '../../../hooks';
import { FcBusinessman } from 'react-icons/fc';
import logo from '../../../assets/img/logo-navbar.png'

export function TopMenu() {
    const { auth, logout } = useAuth();

    const renderName = () => {
        if(auth.me?.first_name && auth.me?.last_name) {
            return `${auth.me.first_name} ${auth.me.last_name}`
        }

        return '';
    }
  return (
    <Navbar
    fluid={true}
    rounded={false}
    border={true}
    >
    <Navbar.Brand href="https://flowbite.com/">
        <img
        src={logo}
        className="mr-3 h-6 sm:h-9"
        alt="virtualbar Logo"
        />
       
    </Navbar.Brand>
    <div className="flex md:order-2">
        <Dropdown
        arrowIcon={false}
        inline={true}
        label={<FcBusinessman className='w-9 h-9' />}
        >
        <Dropdown.Header>
            <span className="block text-sm">
                {renderName()}
            </span>
            <span className="block truncate text-sm font-medium">
                {auth.me?.email}
            </span>
        </Dropdown.Header>
        <Dropdown.Item onClick={logout}>
            Cerrar sesión
        </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
    </div>
    <Navbar.Collapse>
        <AppNavLink to='/admin' text='Pedidos' />
        <AppNavLink to='/admin/mesas' text='Mesas' />
        <AppNavLink to='/admin/historial' text='Historial de pagos' />
        <AppNavLink to='/admin/categorias' text='Categorias' />
        <AppNavLink to='/admin/productos' text='Productos' />
        {auth.me?.is_staff && (
         <AppNavLink to='/admin/usuarios' text='Usuarios' />   
        )
        }
    </Navbar.Collapse>
    </Navbar>
  )
}
