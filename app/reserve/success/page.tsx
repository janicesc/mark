import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"

export default function ReserveSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6">
        <div className="max-w-md text-center space-y-6">
          <h1 className="font-sans text-2xl md:text-3xl font-light tracking-tight text-black">
            Thank you for your reservation
          </h1>
          <p className="text-foreground/70">
            Your payment was successful. We&apos;ll keep you updated on production and shipping.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center h-12 rounded-[4px] bg-black text-white text-sm font-semibold px-6 transition-colors hover:bg-[#FFDB01] hover:text-black"
          >
            Back to home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
