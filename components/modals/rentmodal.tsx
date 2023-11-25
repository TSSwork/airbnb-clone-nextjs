"use client"

import React, { useCallback, useMemo, useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import Modal from './modals'
import useRentModal from '@/hooks/useRentModal'
import ModalHeading from './modalheading';
import { categories } from '@/sitedata/data';
import CategoryInput from '../Inputs/categoryinput';
import CountrySelect from '../countryselect'
import dynamic from 'next/dynamic'
import Counter from '../Inputs/counter'
import ImageUpload from '../Inputs/imageupload'
import InputField from '../Inputs/input'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

export default function RentModal() {
    const rentModal = useRentModal();
    
    const [step,setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,handleSubmit,setValue,watch,
        formState:{
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            loaction: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imgSrc: '',
            prices: '',
            title: '',
            description: '',
        }
    })

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imgSrc = watch('imgSrc');

    const router = useRouter();

    const Map = useMemo(() => dynamic(() => import('../map'),{
        ssr:false,
    }), [])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value,{
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    }

    const onBack = () => {
        setStep((value) => value-1);
    }
    const onNext = () => {
        setStep((value) => value+1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE){
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/listings', data)
        .then(() => {
            toast.success('Listing Created')
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY)
        })
        .catch(() => {
            toast.error("Something went wrong"); 
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    const actionLabel = useMemo(()=>{
        if (step === STEPS.PRICE){
            return 'Create';
        }
        return 'Next'
    },[step])

    const secondaryActionLabel = useMemo(()=>{
        if (step === STEPS.CATEGORY){
            return undefined ;
        }
        return 'Back'
    },[step])


    let bodyContent = (
        <div className="flex flex-col gap-8">
            <ModalHeading
            title="Which of these best descripe your place?"
            subtitle="Pick a category"
             />
             <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto no-scrollbar">
                {categories.map((item,index) =>(
                    <div key={index} className="col-span-1">
                        <CategoryInput 
                        onClick={(category) => setCustomValue('category', category)}
                        selected={category === item.label }
                        label={item.label}
                        icon={item.icon}
                        />
                    </div>
                ))}
             </div>
        </div>
    )

    if (step === STEPS.LOCATION){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <ModalHeading 
                title={"Where is the place located?"}
                subtitle={"Help guest find you!"}
                />
                <CountrySelect
                value={location}
                onChange={(value)=> setCustomValue('location',value)}
                 />
                 <Map center={location?.latlng}/>
            </div>
        )
    }

    if (step === STEPS.INFO){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <ModalHeading 
                title={"Share some basics about your place?"}
                subtitle={"What amenities do you have?"}
                />
                <Counter title={"Guest Count"}
                subtitle={"How many guests do you allow ?"}
                value={guestCount}
                onChange={(value) => setCustomValue('guestCount', value)}
                 />
                 <Counter title={"Rooms"}
                subtitle={"How many rooms do you have ?"}
                value={roomCount}
                onChange={(value) => setCustomValue('roomCount', value)}
                 />
                 <Counter title={"Bathrooms"}
                subtitle={"How many bathrooms do you have ?"}
                value={bathroomCount}
                onChange={(value) => setCustomValue('bathroomCount', value)}
                 />
            </div>
        )
    }

    if (step === STEPS.IMAGES){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <ModalHeading 
                title={"Upload image about your place?"}
                subtitle={"Show guests what your place looks like!"}
                />
                <ImageUpload 
                value={imgSrc}
                onChange={(value) => setCustomValue('imgSrc', value)} />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <ModalHeading 
                title={"How would you describe your place?"}
                subtitle={"short and sweet works best!"}
                />
                <InputField
                id={"title"}
                label={"Title"}
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
                <hr />
                <InputField
                id={"description"}
                label={"Description"}
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />

            </div>
        )
    }

    if (step === STEPS.PRICE){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <ModalHeading 
                title={"Now, set your price"}
                subtitle="how much do you charge per night ?"
                />
                <InputField 
                id="price"
                label="Price"
                formatPrice
                type="number"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
            </div>
        )
    }



 return (
    <Modal 
    isOpen={rentModal.isOpen}
    onClose={rentModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.CATEGORY ? undefined : onBack }
    title={"Airbnb your Home!"}
    body={bodyContent}
    disabled={isLoading}
    />
    )
    
}
