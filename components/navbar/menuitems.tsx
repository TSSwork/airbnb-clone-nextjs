import React from 'react'

type MenuItemProps = {
    onClick: () => void;
    label: string;
}

export default function MenuItems({
    onClick,label
} : MenuItemProps ) {
  return (
    <div onClick={onClick}
    className="px-4 py-3 hover:bg-gray-100 hover:dark:bg-gray-900
    transitiom font-semibold">{label}</div>
  )
}
