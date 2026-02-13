"use client";

import React from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button';
import { signUpDefaultValues } from '@/lib/constants';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';


export default function CredentialsSignUpForm() {
    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>){
        evt.preventDefault();
        const formData = new FormData(evt.currentTarget)
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const password = String(formData.get("password") || "");
        const phone = String(formData.get("phone") );
        if(!name || !password || !email ) return;

        await authClient.signUp.email (
            {
            email,
            password,
            name,
            phone,
        },
        {
            onRequest: () => {},
            onResponse: () => {},
            onError: (ctx) => {
                toast.error(ctx.error.message);
                console.log(ctx.error.mesage);
            },
            onSucces: () => {
                toast.success("Registro correcto");
                console.log("Registro correcto");
            },
        }
    )
    }
  return (
    <form onSubmit={handleSubmit}>
    <div className="space-y-6">
        <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" type="text" defaultValue={signUpDefaultValues.name} required/>
        </div>
        <div>
            <Label htmlFor="email">email</Label>
            <Input id="email" name="email" type="text" defaultValue={signUpDefaultValues.email} required/>
        </div>
        <div>
            <Label htmlFor="phone">phone <span className='text-muted-foreground'>(optional)</span></Label>
            <Input id="phone" name="phone" type="text" defaultValue={signUpDefaultValues.phone} required/>
        </div>
        <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="text" defaultValue={signUpDefaultValues.password} required/>
        </div>
        
        <div>
            <Button className="w-full" type="submit">Sign up</Button>
        </div>
    </div>
  </form>
  );
}
