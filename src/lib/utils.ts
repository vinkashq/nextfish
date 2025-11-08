import { getAppCheckToken } from "@/firebase/client"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

const getInputValue = (id: string) => {
  const inputElement = document.getElementById(id) as HTMLInputElement;
  return inputElement ? inputElement.value : '';
}

const clearInput = (id: string) => {
  const inputElement = document.getElementById(id) as HTMLInputElement;
  if (inputElement) {
    inputElement.value = '';
  }
}

const postRequest = async (url: string, data: any = {}): Promise<Response> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Firebase-AppCheck": await getAppCheckToken()
  };

  return await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
    credentials: 'include',
  });
};

const getServerToken = async (serverTokenUrl: string): Promise<string> => {
  const response = await postRequest(serverTokenUrl);

  if (!response.ok) {
    throw new Error("Failed to get server token: " + response.statusText);
  }

  const token = await response.json();
  if (!token.value) {
    throw new Error("No token received");
  }

  return token.value;
}

/**
 * Removes undefined values from an object (shallow)
 * @param obj - The object to clean
 * @returns A new object without undefined values
 */
const removeUndefined = <T extends Record<string, any>>(obj: T): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined)
  ) as Partial<T>
}

/**
 * Recursively removes undefined values from an object (deep)
 * @param obj - The object to clean
 * @returns A new object without undefined values
 */
const removeUndefinedDeep = <T extends Record<string, any>>(obj: T): Partial<T> => {
  const cleaned = { ...obj }
  
  for (const key in cleaned) {
    if (cleaned[key] === undefined) {
      delete cleaned[key]
    } else if (typeof cleaned[key] === 'object' && cleaned[key] !== null && !Array.isArray(cleaned[key])) {
      cleaned[key] = removeUndefinedDeep(cleaned[key])
    }
  }
  
  return cleaned as Partial<T>
}

export { cn, getInputValue, clearInput, postRequest, getServerToken, removeUndefined, removeUndefinedDeep }
