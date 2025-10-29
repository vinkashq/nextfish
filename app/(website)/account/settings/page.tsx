"use client"

import BreadcrumbHeading from "@/components/breadcrumb-heading"
import { Button } from "@/components/ui/button"
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"
import { useFirebase } from "@/firebase/client"
import { useCurrentUser } from "@/firebase/client/auth"
import { sendPasswordResetEmail } from "firebase/auth"
import { Mail, RectangleEllipsis } from "lucide-react"
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
          <ItemMedia>
            <Mail />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Email Address</ItemTitle>
            <ItemDescription>{user.email}</ItemDescription>
          </ItemContent>
          <ItemFooter className="text-muted-foreground">
            We use your email address to send you important notifications and security updates.
          </ItemFooter>
        </Item>

        <Item variant="outline">
          <ItemMedia>
            <RectangleEllipsis />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Password</ItemTitle>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm" className="font-normal" onClick={resetPassword} disabled={sendingPasswordResetEmail}>
              <Spinner variant="visibleOnDisabled" aria-disabled={sendingPasswordResetEmail} />
              Send Password Reset Email
            </Button>
          </ItemActions>
          <ItemFooter className="text-muted-foreground">
            We will send you an email to change your password.
          </ItemFooter>
        </Item>
      </ItemGroup>
    </div>
  )
}
