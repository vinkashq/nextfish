import { legalBusinessName, privacyPolicyUrl, termsOfServiceUrl } from "@/config";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t mt-4 flex gap-4 justify-between text-xs text-neutral-500 py-4 px-2 sm:px-4 md:px-6">
      <div className="text-center lg:text-left">
        &copy; {new Date().getFullYear()} {legalBusinessName}
      </div>
      <div className='flex gap-4'>
        <Link href={privacyPolicyUrl}>Privacy</Link>
        <Link href={termsOfServiceUrl}>Terms</Link>
      </div>
    </footer>
  )
}
