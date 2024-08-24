'use client';
import {useState, useCallback, useEffect} from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { toast } from 'react-hot-toast';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import axios from 'axios';

type Variant = "LOGIN" | "REGISTER";
export default function AuthForm() {
    let session = useSession();
    let router = useRouter();
    let [variant, setVariant] = useState<Variant>('LOGIN'); 
    let [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
        if(session?.status === 'authenticated'){
            router.push('/users');
        }
    }, [session?.status, router])

    const toggleVariant = useCallback(() => {
        if(variant === "LOGIN") {
            setVariant("REGISTER");
        }
        else {
            setVariant("LOGIN");
        }
    }, [variant]);

    const {
        register, handleSubmit, formState: {errors}
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if(variant === "LOGIN") {
            try{
                signIn("credentials", {...data, redirect: false})
                .then((callback) => {
                    if(callback?.error) {
                        toast.error("Inavalid Credentials");
                    }

                    if(callback?.ok) {
                        toast.success("Login In");
                        router.push('/users');
                    }
                })
                .catch (err => {
                    toast.error(err);
                })
            }
            catch(err) {
                console.log(err)
            }
        }

        if(variant === "REGISTER") {
            axios.post('/api/auth/register', data)
            .then(() => signIn('credentials', {...data}))
            .catch(() => {
                toast.error("Something went wrong!");
            })
            .finally(() => setIsLoading(false));
        }


        setIsLoading(false);
    }

    const socialAction = (action: string) => {
        setIsLoading(true);
    }
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form 
        className=""
        onSubmit={handleSubmit(onSubmit)}
        >
            {
                variant === "REGISTER" && (<Input label="Name" id="name" register={register} errors={errors}
                type="text" placeHolder="please enter name"  disabled={isLoading} required={false}/>)
            }
            <Input label="Email Address" id="email" register={register} errors={errors}
                    type="email" placeHolder="demoemail@gmail.com"  disabled={isLoading} required={false}/>
            <Input label="Password" id="password" register={register} errors={errors}
                    type="password" placeHolder="Enter your password" disabled={isLoading} required={false}/>

            <Button type="submit" disabled={isLoading}>{variant === "LOGIN" ? 'Sign In' : "Sign Up"}</Button>
        </form>

        <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500 w-max">Or Continue With</span>
                    </div>
                    <div className="w-full border-t border-gray-300" />
                </div>
            </div>
        </div>
        <div className="mt-10 flex gap-2">
            <AuthSocialButton  icon={BsGithub} onClick={() => socialAction('github')}/>
            <AuthSocialButton  icon={BsGoogle} onClick={() => socialAction('google')}/>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>{variant === "LOGIN" ? 'New to messanger' : "Already have an account"}</div>
            <div onClick={toggleVariant} className="underline cursor-pointer">{variant === "LOGIN" ? 'Create an account' : "Login"}</div>
        </div>
      </div>
    </div>
  );
}
