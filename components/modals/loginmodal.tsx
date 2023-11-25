"use client"
import userLoginModal from '@/hooks/useLoginModal'
import React, { useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import Modal from './modals'
import ModalHeading from './modalheading'
import InputField from '../Inputs/input'
import toast from 'react-hot-toast'
import { useTheme } from '@/context/themecontext'
import Button from '../button'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import userRegisterModal from '@/hooks/useRegisterModal'
import {useRouter} from 'next/navigation'

export default function LoginModal() {

    const router = useRouter();
    const registerModal = userRegisterModal();
    const loginModal = userLoginModal();
    const [isLoading, setIsLoading] = useState(false);


    const { 
        register,
        handleSubmit,
        formState: {
           errors, 
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials',{
            ...data,
            redirect:false
        })
        .then((callback) => {        
            if (callback?.ok && !callback?.error) {
                toast.success('Logged in')
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.error("Invalid Credentials")
            }
        })
        .finally(() => {
            setIsLoading(false);
         })
    }

    const OauthAction = (action: string) => {
        setIsLoading(true);

        signIn(action, { redirect:false })
        .then((callback) => {        
            if (callback?.ok && !callback?.error) {
                toast.success('Logged in')
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.error("Invalid Credentials")
            }
        })
        .finally(() => {
            setIsLoading(false);
         })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ModalHeading title="Welcome to airbnb" subtitle="Login your account"/>

            <InputField id="email" label="Email" disabled={isLoading}
            register={register} errors={errors} type="text" required
            />
            <InputField id="password" label="Password" disabled={isLoading}
            register={register} errors={errors} type="password" eye changeType="text" required
            />

        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-5">
            <Button 
                outline 
                label='Continue with Google'
                icon = {FcGoogle}
                onClick={() => OauthAction('google')}
            />
            <Button 
                outline 
                label='Continue with Github'
                icon = {AiFillGithub}
                onClick={() => OauthAction('github')}
            />
            <div className="flex items-center justify-center text-black dark:text-neutral-100 mt-4 font-normal">
                <div>
                    <div className="flex gap-3">Don{`'`}t have an account?
                        <span onClick={() => {loginModal.onClose(); registerModal.onOpen();}}
                        className="font-bold text-rose-600 cursor-pointer hover:underline">
                            Sign Up
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )


  return (
    <Modal 
    disabled={isLoading}
    isOpen={loginModal.isOpen}
    title="Login"
    actionLabel="Continue"
    onClose={loginModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}
