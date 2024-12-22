import { lazy } from 'react';

export const list: ListItem[] = [
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
        name: 'Navigation',
        component: lazy(() => import('../components/Navigation/Navigation')),
        color: '#e6fff2'
    },
    {
        id: 4,
        name: 'Password generator',
        component: lazy(() => import('../components/PasswordGenerator/PasswordGenerator')),
        color: '#fff'
    }
]


type ListItem = {
    id: number;
    name: string;
    component: React.LazyExoticComponent<React.FC>;
    color: string;
  };