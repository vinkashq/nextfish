'use client'

import Image from 'next/image';
import { MouseEvent, useState } from 'react';
import { toast } from "sonner";
import { baseUrl } from "@/config";
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { useFirebase } from '@/firebase/client';

export default function GoogleSignInButton() {
  const { auth } = useFirebase();
  const [isDisabled, setIsDisabled] = useState(false);

  async function signInWithGoogle(event: MouseEvent<HTMLButtonElement>) {
    if (!auth) return;
    event.preventDefault();
    setIsDisabled(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(`Error signing in with Google: ${errorCode} - ${errorMessage}`);
    } finally {
      setIsDisabled(false);
    }
  }

  return (
    <button className="gsi-material-button" onClick={signInWithGoogle} disabled={isDisabled}>
      <div className="gsi-material-button-state"></div>
      <div className="gsi-material-button-content-wrapper">
        <div className="gsi-material-button-icon">
          <Image src="/images/google-sign-in-icon.svg" alt="Google" width={24} height={24} />
        </div>
        <span className="gsi-material-button-contents">Sign in with Google</span>
        <span style={{display: 'none'}}>Sign in with Google</span>
      </div>
    </button>
  )
}
