// Footer.tsx
import React, { useState } from "react";
import levita from "../assets/whitelevita.svg"; // import your logo

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setMessage(data.message || "🎉 Thanks for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "⚠️ Something went wrong. Try again.");
      }
    } catch (err) {
      console.error("Newsletter signup error:", err);
      setStatus("error");
      setMessage("⚠️ Network error. Please check your connection.");
    }
  };

  return (
    <footer className="bg-levita-blue-dark text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-6 py-12 md:py-20 lg:py-24">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Column 1: Logo (centered on mobile) & Newsletter */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
            {/* Larger responsive logo */}
            <div className="mb-6 w-full">
              <a
                href="#home"
                rel="home"
                className="inline-flex items-center justify-center md:justify-start w-full"
              >
                <img
                  src={levita}
                  alt="Levita Health"
                  className="h-24 sm:h-28 md:h-36 lg:h-[160px] xl:h-[200px] w-auto object-contain"
                  style={{ display: "block", maxWidth: "100%" }}
                />
              </a>
            </div>

            <p className="text-slate-300 mb-6 max-w-[28rem]">
              Empowering wellness through improved circulation
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-3 w-full max-w-md mx-auto md:mx-0"
            >
              <div className="flex w-full">
                <input
                  type="email"
                  placeholder="Subscribe to our newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 rounded-l-md p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-levita-blue-light"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-levita-blue-light text-white font-bold px-5 rounded-r-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
                >
                  {status === "loading" ? "..." : "Go"}
                </button>
              </div>

              {message && (
                <p
                  className={`text-sm ${
                    status === "success" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#product" className="hover:text-levita-blue-light transition-colors">Product</a></li>
              <li><a href="#about" className="hover:text-levita-blue-light transition-colors">About Us</a></li>
              <li><a href="#team" className="hover:text-levita-blue-light transition-colors">Team</a></li>
              <li><a href="#resources" className="hover:text-levita-blue-light transition-colors">Resources</a></li>
              <li><a href="#faq" className="hover:text-levita-blue-light transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-levita-blue-light transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Contact & Social */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>

            <p className="text-slate-300 mb-4">
              <a
                href="mailto:info@levitahealth.com"
                className="underline hover:text-white"
                aria-label="Email Levita Health"
              >
                info@levitahealth.com
              </a>
            </p>

            <div className="flex items-center space-x-4 mb-2">
              {/* Instagram */}
              <a href="https://www.instagram.com/levita_health/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Levita Health on Instagram" className="text-slate-300 hover:text-white transition-colors">
                <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 1.5A4 4 0 0 0 3.5 7.5v9A4 4 0 0 0 7.5 20.5h9a4 4 0 0 0 4-4v-9a4 4 0 0 0-4-4h-9zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"/>
                </svg>
              </a>

              {/* Twitter */}
              <a href="https://x.com/LevitaHealth" target="_blank" rel="noopener noreferrer" aria-label="Levita Health on Twitter" className="text-slate-300 hover:text-white transition-colors">
                <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.418.113-.86.172-1.314.172-.303 0-.596-.03-.883-.083.621 1.936 2.422 3.336 4.556 3.375-1.625 1.272-3.669 2.029-5.887 2.029-.381 0-.756-.022-1.127-.066 2.099 1.343 4.6 2.264 7.34 2.264 8.799 0 13.619-7.29 13.415-13.876.929-.67 1.734-1.503 2.364-2.45z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/levita-health/" target="_blank" rel="noopener noreferrer" aria-label="Levita Health on LinkedIn" className="text-slate-300 hover:text-white transition-colors">
                <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FULL-WIDTH bottom bar */}
      <div className="w-full border-t border-slate-600 bg-levita-blue-dark">
        <div className="container mx-auto px-6 py-6">
          <p className="text-slate-400 text-sm text-center">© 2025 Levita Health. All Rights Reserved.</p>
          <p className="text-slate-400 text-sm text-center mt-2">
            <a href="/assets/Downloads/Final_Levita Health Privacy Policy.docx" download="Levita-Health-Privacy-Policy.docx" className="hover:text-white">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="/assets/Downloads/090525_Levita Health Terms of Service.docx" download="Levita-Health-Terms-of-Service.docx" className="hover:text-white">Terms of Use</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
