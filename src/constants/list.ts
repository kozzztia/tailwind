import { lazy } from 'react';

export const list = [
    {
        id: 1,
        name: 'Profile Card',
        component: lazy(() => import('../components/ProfileCard/ProfileCard')),
    },
    {
        id: 2,
        name: 'Profile Card',
        component: lazy(() => import('../components/ProfileCard/ProfileCard')),
    },
    {
        id: 3,
        name: 'Profile Card',
        component: lazy(() => import('../components/ProfileCard/ProfileCard')),
    },
    {
        id: 4,
        name: 'Profile Card',
        component: lazy(() => import('../components/ProfileCard/ProfileCard')),
    }
]