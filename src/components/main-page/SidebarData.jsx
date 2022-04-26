import React from 'react';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AttributionIcon from '@mui/icons-material/Attribution';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import StorageIcon from '@mui/icons-material/Storage';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


const SidebarData = [
    {
        id: 1,
        name: "Профиль",
        path: "/profile",
        icon: <AccountCircleIcon/>
    },
    {
        id: 2,
        name: "Атрибуты",
        path: "/attributes",
        icon: <AttributionIcon/>
    },
    {
        id: 3,
        name: "Фильтры",
        path: "/filters",
        icon: <FilterAltIcon/>
    },
    {
        id: 4,
        name: "Списки",
        path: "/lists",
        icon: <ListAltIcon/>
    },
    {
        id: 5,
        name: "Доступы",
        path: "/access-manager",
        icon: <PersonAddIcon/>
    },
    {
        id: 6,
        name: "Данные",
        path: "/data-manager",
        icon: <StorageIcon/>
    }
];

export default SidebarData;