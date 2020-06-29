import React from 'react';

const Home = React.lazy(() => import('Src/modules/Home'));
const Rooms = React.lazy(() => import('Src/modules/Home/containers/Rooms'));
const Blocks = React.lazy(() => import('Src/modules/Home/containers/Blocks'));
const RoomsMotel = React.lazy(() => import('Src/modules/Home/containers/RoomsMotel'));
const Services = React.lazy(() => import('Src/modules/Home/containers/Services'));
const Customers = React.lazy(() => import('Src/modules/Home/containers/Customers'));
const Contracts = React.lazy(() => import('Src/modules/Home/containers/Contracts'));
const Bill = React.lazy(() => import('Src/modules/Home/containers/Bill'));

export default [
    {
        state: 'home',
        path: '/home',
        exact: true,
        name: 'Home',
        component: Home,
        resources: [
          
        ]
    },
    {
        state: 'rooms',
        path: '/rooms',
        exact: true,
        name: 'Rooms',
        component: Rooms
    },
    {
        state: 'blocks',
        path: '/blocks',
        exact: true,
        name: 'Blocks',
        component: Blocks
    },
    {
        state: 'roomsmotel',
        path: '/rooms-motel',
        exact: true,
        name: 'RoomsMotel',
        component: RoomsMotel
    },
    {
        state: 'services',
        path: '/services',
        exact: true,
        name: 'Services',
        component: Services
    },
    {
        state: 'customers',
        path: '/customers',
        exact: true,
        name: 'Customers',
        component: Customers
    },
    {
        state: 'contracts',
        path: '/contracts',
        exact: true,
        name: 'Contracts',
        component: Contracts
    },
    {
        state: 'bill',
        path: '/bill',
        exact: true,
        name: 'Bill',
        component: Bill
    }
];
