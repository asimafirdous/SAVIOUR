import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900">
              SAVIOUR
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
              Never let the door close on you.
              Stay ahead of every opportunity.
            </p>
          </div>


          {/* Product */}
          <div>
            <h4 className="font-semibold text-slate-900">
              Product
            </h4>

            <div className="mt-4 space-y-3">

              <Link
                href="#features"
                className="block text-slate-600 hover:text-indigo-600"
              >
                Features
              </Link>

              <Link
                href="#ai"
                className="block text-slate-600 hover:text-indigo-600"
              >
                AI Assistant
              </Link>

              <Link
                href="#security"
                className="block text-slate-600 hover:text-indigo-600"
              >
                Security
              </Link>

            </div>
          </div>


          {/* Company */}
          <div>
            <h4 className="font-semibold text-slate-900">
              Company
            </h4>

            <div className="mt-4 space-y-3">

              <Link
                href="#"
                className="block text-slate-600 hover:text-indigo-600"
              >
                About
              </Link>

              <Link
                href="#"
                className="block text-slate-600 hover:text-indigo-600"
              >
                Contact
              </Link>

            </div>
          </div>


          {/* Legal */}
          <div>
            <h4 className="font-semibold text-slate-900">
              Legal
            </h4>

            <div className="mt-4 space-y-3">

              <Link
                href="#"
                className="block text-slate-600 hover:text-indigo-600"
              >
                Privacy Policy
              </Link>

              <Link
                href="#"
                className="block text-slate-600 hover:text-indigo-600"
              >
                Terms of Service
              </Link>

            </div>
          </div>

        </div>


        <div className="mt-12 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          © 2026 SAVIOUR. All rights reserved.
        </div>

      </div>
    </footer>
  );
}