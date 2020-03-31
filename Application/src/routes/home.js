import React from 'react';

const Home = React.lazy(() => import('Src/modules/Home'));
const Rooms = React.lazy(() => import('Src/modules/Home/containers/Rooms'));
const Blocks = React.lazy(() => import('Src/modules/Home/containers/Blocks'));

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
    }
];
