import React from 'react';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AttributionIcon from '@mui/icons-material/Attribution';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ListAltIcon from '@mui/icons-material/ListAlt';


const SidebarData = [
    {
        id: 1,
        name: "Профиль",
        path: "/profile",
        icon: <AccountCircleIcon/>
    },
    {
        id: 3,
        name: "Атрибуты",
        path: "/attributes",
        icon: <AttributionIcon/>
    },
    {
        id: 4,
        name: "Фильтры",
        path: "/filters",
        icon: <FilterAltIcon/>
    },
    {
        id: 5,
        name: "Списки",
        path: "/lists",
        icon: <ListAltIcon/>
    },
];

export default SidebarData;