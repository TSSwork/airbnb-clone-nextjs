import React from 'react'
import { useCallback} from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

type CounterProps = {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;
}

export default function Counter({
    title,
    subtitle,
    value,
    onChange,
}: CounterProps) {

    const onAdd = useCallback(() => {
        onChange(value+1)
    },[value,onChange]);

    const onReduce = useCallback(() => {
        if (value === 1){
            return;
        }
        onChange(value-1)
    },[value,onChange])


  return (
    <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
            <div className="font-medium">
                {title}
            </div>
            <div className="font-light text-gray-500">
                {subtitle}
            </div>
        </div>
        <div className="flex flex-row items-center gap-4">
            <div onClick={onReduce}
            className="w-10 h-10 rounded-full border-[1px] border-neutral-500
            flex items-center justify-center text-neutral-500 cursor-pointer hover:opacity-80 tansistion">
                <AiOutlineMinus />
            </div>

            <div className="font-light text-xl text-neutral-500">
                {value}
            </div>

            <div onClick={onAdd}
            className="w-10 h-10 rounded-full border-[1px] border-neutral-500
            flex items-center justify-center text-neutral-500 cursor-pointer hover:opacity-80 tansistion">
                <AiOutlinePlus />
            </div>
        </div>
    </div>
  )
}
