"use client";

import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button';
import { signUpDefaultValues } from '@/lib/constants';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';


export default function CredentialsSignUpForm() {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>){
        evt.preventDefault();
        const formData = new FormData(evt.currentTarget)
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const password = String(formData.get("password") || "");
        const confpassword = String(formData.get("confpassword") || "");
        const phone = String(formData.get("phone") );
        const comms = String(formData.get("comms") || "Mail");
        const newErrors: Record<string, string> = {};

    if (!name) newErrors.name = "Name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";
    if (!confpassword) newErrors.confpassword = "Please confirm your password.";
    if (password && confpassword && password !== confpassword) newErrors.confpassword = "Passwords do not match.";
    if (comms === "Phone" && !phone) newErrors.phone = "Phone is required when you choose Phone communications.";
    // terms checkbox validation
    const termsChecked = formData.get("terms") === "on" || formData.get("terms") === "true" || formData.get("terms") === "1";
    if (!termsChecked) newErrors.terms = "You must agree to the terms and conditions.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
        try {
        await authClient.signUp.email (
            {
            email,
            password,
            name,
            phone,
            comms,
        },
        {
            onRequest: () => {},
            onResponse: () => {},
            onError: (ctx) => {
                setErrors({ general: ctx.error?.message || "Registration failed" });
            },
            onSucces: () => {
                toast.success("Registro correcto");
                console.log("Registro correcto");
            },
        }
    );
    } catch (e: any) {
      setErrors({ general: e?.message || "Registration failed" });
    } finally {
      setSubmitting(false);
    }
    }
  return (
    <form onSubmit={handleSubmit}>
    <div className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="text" defaultValue={signUpDefaultValues.name} />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" defaultValue={signUpDefaultValues.email} />
          {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Phone <span className="text-muted-foreground">(Optional)</span></Label>
          <Input id="phone" name="phone" type="text" defaultValue={signUpDefaultValues.phone} />
          {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" defaultValue={signUpDefaultValues.password} />
          {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
        </div>
        <div>
          <Label htmlFor="confpassword">Confirm Password</Label>
          <Input id="confpassword" name="confpassword" type="password" />
          {errors.confpassword && <p className="text-sm text-red-600 mt-1">{errors.confpassword}</p>}
        </div>
        <div>
          <div className="flex items-center space-x-2 ">
            <Input id="terms" name="terms" type="checkbox" className="size-4"/>
            <Label htmlFor="terms">I agree to the terms and conditions</Label>
          </div>
          {errors.terms && <p className="text-sm text-red-600 mt-1">{errors.terms}</p>}
        </div>
        <div>
          <Label>How do you want to receive notifications?</Label>
          <div className="flex items-center space-x-4 mt-2">
            <label className="flex items-center space-x-2">
              <Input id="comms-mail" name="comms" type="radio" value={"Mail"} defaultChecked />
              <span>Mail</span>
            </label>
            <label className="flex items-center space-x-2">
              <Input id="comms-phone" name="comms" type="radio" value={"Phone"} />
              <span>Phone</span>
            </label>
          </div>
        </div>
        <div>
          <Button className="w-full" type="submit" disabled={submitting}>
            {submitting ? "Signing up..." : "Sign Up"}
          </Button>
          {errors.general && <p className="text-sm text-red-600 mt-3">{errors.general}</p>}
        </div>
      </div>
  </form>
  );
}
