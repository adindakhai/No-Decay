import Image from "next/image"
import SignUpForm from "../../components/ui/sign-up-form"
import Link from "next/link"

export default function SignUpPage() {
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
        <h1 className="text-3xl font-bold text-center text-green-900">Sign Up</h1>
        <SignUpForm />
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="text-green-800 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
