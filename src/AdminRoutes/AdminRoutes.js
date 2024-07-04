import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ConsommableDetails from '../Elements/Consommable/CRUD/ConsommableDetails';
import CreateConsommable from '../Elements/Consommable/CRUD/CreateConsommable';
import EditConsommable from '../Elements/Consommable/CRUD/EditConsommable';
import DeleteConsommable from '../Elements/Consommable/CRUD/DeleteConsommable';

import TraitDetails from '../Elements/Trait/CRUD/TraitDetails';
import CreateTrait from '../Elements/Trait/CRUD/CreateTrait';
import EditTrait from '../Elements/Trait/CRUD/EditTrait';
import DeleteTrait from '../Elements/Trait/CRUD/DeleteTrait';

import CreateWeapon from '../Elements/Weapon/CRUD/CreateWeapon';

const AdminRoutes = ({userLogged})=> {


const protectedRoutes = [
    {
      path: '/admin/consommable/list',
      element: (
        <ConsommableDetails
          userLogged={userLogged}
          requiredRole="admin"
        />
      )
    },
    {
      path: '/admin/consommable/create',
      element: (
        <CreateConsommable
          userLogged={userLogged}
          requiredRole="admin"
        />
      )
    },
    {
      path: '/admin/consommable/edit/:id',
      element: (
        <EditConsommable
          userLogged={userLogged}
          requiredRole="admin"
        />
      )
    },
    {
      path: '/admin/consommable/delete/:id',
      element: (
        <DeleteConsommable
          userLogged={userLogged}
          requiredRole="admin"
        />
      )
    },
    {
      path: '/admin/traits/:id',
      element: (
        <TraitDetails
          userLogged={userLogged}
          requiredRole="admin"
        />
      )
    },
    {
      path: '/admin/traits/create',
      element: (
        <CreateTrait
          userLogged={userLogged}
          requiredRole="admin"
        />
      )
    },
    {
      path: '/admin/traits/edit/:id',
      element: (
        <EditTrait
          userLogged={userLogged}
          requiredRole="admin"
        />
      )
    },
    {
      path: '/admin/traits/delete/:id',
      element: (
        <DeleteTrait
          userLogged={userLogged}
          requiredRole="admin"
        />
      )
    },
    {
      path: '/admin/armes/create',
      element: (
        <Route
          path="/admin/armes/create"
          element={<CreateWeapon userLogged={userLogged} requiredRole="admin" />}
        />
      )
    }
  ];

  return (
    <Routes>
        {protectedRoutes.map((route,index) =>(
            <Route key={index} path={route.path} element={route.element}/>
        ))}
    </Routes>
  )

}
export default AdminRoutes;