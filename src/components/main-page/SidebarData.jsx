import React from 'react';
import AttributionIcon from '@mui/icons-material/Attribution';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import StorageIcon from '@mui/icons-material/Storage';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';


const SidebarData = [
    {
        id: '1',
        name: "Атрибуты",
        path: "/attributes",
        icon: <AttributionIcon/>
    },
    {
        id: '2',
        name: "Фильтры",
        path: "/filters",
        icon: <FilterAltIcon/>
    },
    {
        id: '3',
        name: "Списки",
        path: "/lists",
        icon: <ListAltIcon/>
    },
    // {
    //     id: '4',
    //     name: "Профиль",
    //     path: "/profile",
    //     icon: <AccountCircleIcon/>
    // },
    {
        id: '4',
        name: "Доступы",
        path: "/access-manager",
        icon: <PersonAddIcon/>
    },
    {
        id: '5',
        name: "Данные",
        path: "/data-manager",
        icon: <StorageIcon/>
    },
    {
        id: '6',
        name: "Пользователи",
        path: "/users",
        icon: <PeopleIcon/>
    }
];

export default SidebarData;