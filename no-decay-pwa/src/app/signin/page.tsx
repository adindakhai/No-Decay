import Link from "next/link"
import Image from "next/image"
import SignInForm from "../../components/ui/sign-in-form"

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <div className="w-full max-w-md space-y-6">
        <Image
          src="/image/sayur.svg"
          alt="Sayur"
          width={300}
          height={200}
          className="mx-auto"
        />
        <h1 className="text-3xl font-bold text-center text-green-900">Sign In</h1>
        <SignInForm />
        <p className="text-center text-sm">
          Don&apos;t have account?{" "}
          <Link href="/signup" className="text-green-800 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
