import { appName } from "@/config";
import Logomark from "./logomark";

export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center p-24">
      <div className="text-center">
        <Logomark className="w-24 mx-auto" />
        <h1 className="text-2xl font-bold mt-4">Welcome to {appName}</h1>
        <p className="mt-2 text-muted-foreground">
          Get started by building out your dashboard.
        </p>
      </div>
    </div>
  )
}