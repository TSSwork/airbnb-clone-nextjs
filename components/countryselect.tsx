import useCountries from '@/hooks/useCountries';
import React from 'react'
import Select from 'react-select'

export type CountrySelectValue = {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;

}

type CountrySelectProps = {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

export default function CountrySelect({
    value,onChange
}:CountrySelectProps) {
    const {getAll} = useCountries();
  return (
    <div>
        <Select 
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        classNames={{
            control: () =>
              'dark: dark:bg-gray-900 p-2 border-2',
            option: () =>
                'dark:bg-gray-900'
          }}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option:any) => (
            <div className="flex flex-row items-center gap-3">
                <div>{option.flag}</div>
                <div className="font-semibold">
                    {option.label},
                    <span className="ml-1 font-normal">{option.region}</span>
                </div>
            </div>
        )}
        />
    </div>
  )
}
