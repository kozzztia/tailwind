import { lazy } from 'react';

export const list = [
    {
        id: 1,
        name: 'Profile Card',
        component: lazy(() => import('../components/ProfileCard/ProfileCard')),
        color: '#ffbf80'
    },
    {
        id: 2,
        name: 'Add To Bag challenge',
        component: lazy(() => import('../components/AddToBagChallenge/AddToBagChallenge')),
        color: '#fff'
    },
    {
        id: 3,
        name: 'Profile Card',
        component: lazy(() => import('../components/ProfileCard/ProfileCard')),
        color: 'green'
    },
    {
        id: 4,
        name: 'Profile Card',
        component: lazy(() => import('../components/ProfileCard/ProfileCard')),
        color: 'red'
    }
]