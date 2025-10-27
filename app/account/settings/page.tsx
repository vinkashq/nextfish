"use client"

import BreadcrumbHeading from "@/components/breadcrumb-heading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemHeader, ItemTitle } from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"
import { useFirebase } from "@/firebase/client"
import { useCurrentUser } from "@/firebase/client/auth"
import { sendPasswordResetEmail } from "firebase/auth"
import { useState } from "react"
import { toast } from "sonner"

export default function Settings() {
  const { auth } = useFirebase()
  const { user } = useCurrentUser()
  const [sendingPasswordResetEmail, setSendingPasswordResetEmail] = useState(false)

  function resetPassword() {
    setSendingPasswordResetEmail(true)

    if (!user || !user.email) {
      console.error("No user or email found")
      setSendingPasswordResetEmail(false)
      return
    }

    sendPasswordResetEmail(auth, user.email)
      .then(() => {
        toast.success("Password reset email sent successfully!")
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        toast.error(`Error sending password reset email: ${errorCode} - ${errorMessage}`)
      }).finally(() => {
        setSendingPasswordResetEmail(false)
      })
  }

  if (!user) {
    return <div className="mx-auto max-w-4xl">Loading...</div>
  }

  return (
    <div className="flex flex-col gap-4 mx-auto max-w-2xl min-h-svh">
      <BreadcrumbHeading text="Settings" />

      <h1 className="scroll-m-20 text-left text-4xl font-extrabold tracking-tight text-balance">
        Account Settings
      </h1>
      <ItemGroup className="gap-4">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Email Address</ItemTitle>
          <ItemDescription>We use your email address to send you important notifications and security updates.</ItemDescription>
        </ItemContent>
        <ItemFooter>
          <ItemActions>
            {user.email ? (
              <Input type="email" 
                    value={user.email} 
                    readOnly
                    disabled
                    placeholder="Email address" />
            ) : (
              <div>No email address set</div>
            )}
          </ItemActions>
        </ItemFooter>
      </Item>

      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Change Password</ItemTitle>
          <ItemDescription>
            We will send you an email to change your password.
          </ItemDescription>
        </ItemContent>
        <ItemFooter>
          <ItemActions>
            <Button className="font-normal" variant="outline" size="sm" onClick={resetPassword} disabled={sendingPasswordResetEmail}>
              <Spinner variant="visibleOnDisabled" aria-disabled={sendingPasswordResetEmail} />
              Send Password Reset Email
            </Button>
          </ItemActions>
        </ItemFooter>
      </Item>
      </ItemGroup>
    </div>
  )
}
