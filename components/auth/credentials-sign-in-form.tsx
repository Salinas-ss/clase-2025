"use client";

import React from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button';
import { signUpDefaultValues } from '@/lib/constants';
import { authClient } from '@/lib/auth-client';


export default function CredentialsSignInForm( {callbackUrl = "/profile",} : {callbackUrl? :string}) {
    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>){
        evt.preventDefault();
        const formData = new FormData(evt.currentTarget)
        const email = String(formData.get("email") || "").trim();
        const password = String(formData.get("password") || "");
        if( !password || !email ) return;

        await authClient.signIn.email (
            {
            email,
            password,
            callbackURL: callbackUrl,
        },
        {
            onRequest: () => {},
            onResponse: () => {},
            onError: (ctx) => {ctx.error.mesage},
            onSucces: () => {
                console.log("Login correcto");
            },
        }
    )
    }
  return (
    <form onSubmit={handleSubmit}>
    <div className="space-y-6">

        <div>
            <Label htmlFor="email">email</Label>
            <Input id="email" name="email" type="text" defaultValue={signUpDefaultValues.email} required/>
        </div>
        <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="text" defaultValue={signUpDefaultValues.password} required/>
        </div>
        
        <div>
            <Button className="w-full" type="submit">Sign in</Button>
        </div>
    </div>
  </form>
  );
}
