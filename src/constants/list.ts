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
    },
    {
        id: 5,
        name: 'Fur friends',
        component: lazy(() => import('../components/FurFriends/FurFriends')),
        color: '#ddff99'
    },
    {
        id: 6,
        name: 'FAQ',
        component: lazy(() => import('../components/FAQ/FAQ')),
        color: 'linear-gradient(0deg, rgba(227,227,227,1) 71%, rgba(0,254,251,1) 71%)'
    },
    {
        id: 7,
        name: 'Customer list',
        component: lazy(() => import('../components/CustomerList/CustomerList')),
        color: '#fff'
    },
    {
        id: 8,
        name: 'Progress bars',
        component: lazy(() => import('../components/ProgressBars/ProgressBars')),
        color: '#4774d6'
    },
    {
        id: 9,
        name: 'Color range',
        component: lazy(() => import('../components/ColorRange/ColorRange')),
        color: 'var(--rate-accent-color)'
    },
    {
        id: 10,
        name: 'Time',
        component: lazy(() => import('../components/Timer/Timer')),
        color: 'var(--timer-accent-color)'
    },
    {
        id: 11,
        name: 'Smile',
        component: lazy(() => import('../components/Smile/Smile')),
        color: 'var(--smile-bg)'
    },
    // {
    //     id: 12,
    //     name: 'Form',
    //     component: lazy(() => import('../components/Form/ReactForm')),
    //     color: 'var(--form-accent-color)'
    // }
].reverse();


type ListItem = {
    id: number;
    name: string;
    component: React.LazyExoticComponent<React.FC>;
    color: string;
  };