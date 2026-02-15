"use client"
import React from 'react'
import { authClient } from '@/lib/auth-client'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserIcon } from 'lucide-react'

export default function ToggleSigninSignout() {
  const router = useRouter();
    const {data:session, isPending} = authClient.useSession();

    if (isPending) return <Button variant={'outline'} disabled>loading...</Button>
  
    if (session){
        return <Button 
            onClick={async () => {
                await authClient.signOut({
                    fetchOptions: 
                        {onSuccess: () => {
                            router.push("/")
                        }
                    }
                })
        }}
        variant={'destructive'}
        >
            Sign Out
        </Button>
    }
    return  <Button asChild variant={'ghost'}>
                        <Link href={'/sign-in'}>
                           <UserIcon/> Sign in
                        </Link>
                    </Button>
}
