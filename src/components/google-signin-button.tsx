'use client'

import Image from 'next/image';
import { MouseEvent, useState } from 'react';
import { GoogleAuthProvider } from 'firebase/auth';
import { useAuth } from '@/context/firebase/AuthContext';

export default function GoogleSignInButton() {
  const { auth, signIn } = useAuth()
  const [isDisabled, setIsDisabled] = useState(false);

  async function signInWithGoogle(event: MouseEvent<HTMLButtonElement>) {
    if (!auth) return;
    event.preventDefault();
    setIsDisabled(true);

    const provider = new GoogleAuthProvider();
    signIn({ provider })
      .finally(() => {
        setIsDisabled(false);
      })
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
