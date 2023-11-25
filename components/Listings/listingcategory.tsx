import React, {ReactElement} from 'react'

type ListingCategoryProps = {
    icon: ReactElement;
    label: string;
    description: string;
}

export default function ListingCategory({
    icon,
    label,
    description,
}:ListingCategoryProps) {
  return (
    <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center gap-4">
            <div className="text-2xl p-2 border-2 rounded-full border-gray-700 dark:border-gray-100 flex items-center">
                {icon}
            </div>
            <div className="flex-col flex">
                <div className="text-lg-font-semibold">
                    {label}
                </div>
                <div className="font-light text-neutral-500">
                    {description}
                </div>
            </div>
        </div>
    </div>
  )
}
