import { useEffect, useState } from "react"
import { Auth, onAuthStateChanged, signInWithCustomToken, User, UserCredential } from "firebase/auth"
import { getServerToken, postRequest } from "@/lib/utils";
import { baseUrl } from "@/config";
import { logEvent, useFirebase } from ".";

const idTokenVerificationUrl = `${baseUrl}/api/verify-id-token`
const serverTokenUrl = `${baseUrl}/api/token`
const serverSignOutUrl = `${baseUrl}/api/sign-out`

const verifyIdToken = async (auth: Auth, user: User) => {
  const idToken = await user.getIdToken();
  if (!idToken) {
    console.error("User ID token is not available.")
    return false
  }

  try {
    const response = await postRequest(idTokenVerificationUrl, { idToken })
    if (!response.ok) {
      console.error('Failed to verify ID token:', response.statusText)
      await signOutOnClient(auth, user.uid)
      return false
    }
  } catch (error) {
    console.error('Error verifying ID token:', error)
    await signOutOnClient(auth, user.uid)
    return false
  }

  logEvent('id_token_verified', {
    uid: user.uid,
  });
  return true;
}

const signIn = async (callback: () => Promise<UserCredential>) => {
  let userCredential: UserCredential;

  try {
    userCredential = await callback();
  } catch (error) {
    console.error("Error signing in:", error);
    throw error; // Re-throw the error for further handling if needed
  }

  logEvent('signed_in', {
    uid: userCredential.user.uid,
  });

  return userCredential;
}

const signInWithServerToken = async (auth: Auth) => {
  if (!serverTokenUrl) {
    throw new Error("Server token URL is not set.");
  }

  const serverToken = await getServerToken(serverTokenUrl);
  if (!serverToken) {
    throw new Error("Failed to retrieve token from server.");
  }

  return signIn(async () => {
    return await signInWithCustomToken(auth, serverToken);
  });
}

const signOut = async (auth: Auth) => {
  const uid = auth.currentUser?.uid;
  let redirectUrl = baseUrl

  redirectUrl = await signOutOnServer(uid, redirectUrl)
  await signOutOnClient(auth, uid)

  window.location.href = redirectUrl;
  return true;
};

const signOutOnServer = async (uid: string, redirectUrl: string) => {
  if (!serverSignOutUrl) return

  const response = await postRequest(serverSignOutUrl)

  if (response.ok) {
    const data = await response.json();
    if (data.status === 'success') {
      logEvent('server_signed_out', {
        uid
      });
      redirectUrl = data.redirectUrl || redirectUrl;
    }
  }

  return redirectUrl
}

const signOutOnClient = async (auth: Auth, uid: string) => {
  await auth.signOut();

  logEvent('signed_out', {
    uid
  });
}

import { getRedirectResult } from "firebase/auth";

const useCurrentUser = () => {
  const { isLoading, auth } = useFirebase();
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isTokenLoading, setIsTokenLoading] = useState(true);
  const [user, setUser] = useState<User | null>(auth?.currentUser || null);
  const [idTokenVerified, setIdTokenVerified] = useState<boolean | null>(null);

  useEffect(() => {
    if (isLoading || !auth) return;

    getRedirectResult(auth)
      .then((userCredential) => {
        if (userCredential) {
          logEvent('signed_in', {
            uid: userCredential.user.uid,
          });
        }
      })
      .catch((error) => {
        console.error("Error getting redirect result:", error);
      });

    onAuthStateChanged(auth, (newUser) => {
      setIsUserLoading(false);

      if (newUser?.uid === user?.uid) {
        return;
      }

      setUser(newUser);
    });
  }, [isLoading, auth, user]);

  useEffect(() => {
    if (isUserLoading) {
      return;
    }
    
    if (!user) {
      signInWithServerToken(auth)
        .then((userCredential) => {
          setUser(userCredential.user);
        })
        .finally(() => {
          setIsTokenLoading(false);
        });
      return;
    }

    verifyIdToken(auth, user)
      .then(setIdTokenVerified).catch((error) => {
        console.error("Error checking sign-in verification:", error);
        setIdTokenVerified(false);
      });
  }, [auth, isUserLoading, user]);

  return {
    isLoading: isLoading || isUserLoading || (isTokenLoading && !user),
    user,
    idTokenVerified,
  };
}

export {
  verifyIdToken,
  signIn,
  signInWithServerToken,
  signOut,
  useCurrentUser
}
