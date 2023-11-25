import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import { FaSkiing } from 'react-icons/fa'
import { BsSnow } from 'react-icons/bs'
import { IoDiamond } from 'react-icons/io5'
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import React from "react";

export const categories = [
    { 
        label: 'Beach',
        icon: React.createElement(TbBeach),
        description: 'This property is close to beach'
    },
    { 
        label: 'Windmill',
        icon: React.createElement(GiWindmill),
        description: 'This property is close to windmill'
    },
    { 
        label: 'Modern',
        icon: React.createElement(MdOutlineVilla), 
        description: 'This property is close to beach'
    },
    { 
        label: 'Countryside',
        icon: React.createElement(TbMountain),
        description: 'This property is near Mountains'
    },
    { 
        label: 'Pool',
        icon: React.createElement(TbPool),
        description: 'This property has pools'
    },
    { 
        label: 'Island',
        icon: React.createElement(GiIsland),
        description: 'This property is in Island'
    },
    { 
        label: 'Lake',
        icon: React.createElement(GiBoatFishing),
        description: 'This property is near a Lake'
    },
    { 
        label: 'Skiing',
        icon: React.createElement(FaSkiing),
        description: 'This property has Skiing facilities'
    },
    { 
        label: 'Castles',
        icon: React.createElement(GiCastle),
        description: 'This property is a Castle'
    },
    { 
        label: 'Camping',
        icon: React.createElement(GiForestCamp),
        description: 'This property has camping activities'
    },
    { 
        label: 'Arctic',
        icon: React.createElement(BsSnow),
        description: 'This property is in Arctic'
    },
    { 
        label: 'Cave',
        icon: React.createElement(GiCaveEntrance),
        description: 'This property is near a Cave'
    },
    { 
        label: 'Desert',
        icon: React.createElement(GiCactus),
        description: 'This property is in a Dessert'
    },
    { 
        label: 'Barns',
        icon: React.createElement(GiBarn),
        description: 'This property is in a Barn'
    },
    { 
        label: 'Lux',
        icon: React.createElement(IoDiamond),
        description: 'This property is in a Luxurious'
    },
        
]