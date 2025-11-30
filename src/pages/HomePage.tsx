import {useEffect} from "react";
import CRMDashboard from "../assets/crm_dashboard.png"; 
import { isAuthenticated } from '../services/authService';
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated()) {
      navigate("/dashboard");
    }
  }, []);  

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="mb-12 sm:mb-16 md:mb-20 text-center pt-16 sm:pt-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-indigo-900 dark:text-white px-4">Welcome to EdgeLead</h1>
        <p className="text-indigo-700 dark:text-gray-300 mt-4 sm:mt-6 md:mt-8 text-lg sm:text-xl md:text-2xl px-4">
          Your ultimate CRM solution for modern sales teams.
        </p>
        <p className="text-indigo-700 dark:text-gray-400 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-4">
          EdgeLead empowers your team to manage leads, track deals, and optimize workflows with ease. 
          Designed for efficiency and scalability, our platform ensures you stay ahead in the competitive sales landscape.
        </p>
        <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4">
          <a
            href="/get-started"
            className="bg-indigo-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold shadow-lg hover:bg-indigo-700 dark:bg-gray-700 dark:hover:bg-gray-600 transition text-center"
          >
            Get Started
          </a>
          <a
            href="/learn-more"
            className="bg-indigo-50 text-indigo-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold shadow-lg hover:bg-indigo-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition text-center"
          >
            Learn More
          </a>
        </div>
        <div className="mt-16">
          <img
            src={CRMDashboard}
            alt="EdgeLead Dashboard"
            className="mx-auto rounded-lg shadow-lg max-w-full sm:max-w-4xl w-auto"
            loading="lazy"
          />
        </div>
      </header>

      {/* Details Section */}
      <section className="mb-12 sm:mb-16 md:mb-20" id="products">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-900 dark:text-white mb-6 sm:mb-8 md:mb-12 text-center px-4">Why Choose EdgeLead?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12 px-4">
          <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-6 sm:p-8 md:p-12 text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-indigo-900 dark:text-white">Streamlined Workflow</h3>
            <p className="text-indigo-700 dark:text-gray-300 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg">
              Manage your leads, deals, and tasks all in one place with ease.
            </p>
          </div>
          <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-6 sm:p-8 md:p-12 text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-indigo-900 dark:text-white">Data-Driven Insights</h3>
            <p className="text-indigo-700 dark:text-gray-300 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg">
              Make informed decisions with real-time analytics and reporting.
            </p>
          </div>
          <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-6 sm:p-8 md:p-12 text-center sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-indigo-900 dark:text-white">Seamless Integration</h3>
            <p className="text-indigo-700 dark:text-gray-300 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg">
              Integrate with your favorite tools for a unified experience.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-12 sm:mb-16 md:mb-20" id="faq">
        <div className="space-y-6 sm:space-y-8 md:space-y-12 px-4">
          <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-6 sm:p-8 md:p-12">
            <h3 className="text-xl sm:text-2xl font-semibold text-indigo-900 dark:text-white">What is EdgeLead?</h3>
            <p className="text-indigo-700 dark:text-gray-300 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg">
              EdgeLead is a CRM platform designed to help sales teams manage leads, track deals, and grow revenue.
            </p>
          </div>
          <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-6 sm:p-8 md:p-12">
            <h3 className="text-xl sm:text-2xl font-semibold text-indigo-900 dark:text-white">Is there a free trial?</h3>
            <p className="text-indigo-700 dark:text-gray-300 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg">
              Yes, we offer a 14-day free trial with no credit card required.
            </p>
          </div>
          <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-6 sm:p-8 md:p-12">
            <h3 className="text-xl sm:text-2xl font-semibold text-indigo-900 dark:text-white">Can I cancel anytime?</h3>
            <p className="text-indigo-700 dark:text-gray-300 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg">
              Absolutely! You can cancel your subscription at any time without any penalties.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="mb-12 sm:mb-16 md:mb-20" id="pricing">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-900 dark:text-white mb-6 sm:mb-8 md:mb-12 text-center px-4">Pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12 px-4">
          <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-6 sm:p-8 md:p-12 text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-indigo-900 dark:text-white">Basic</h3>
            <p className="text-indigo-700 dark:text-gray-300 mt-4 sm:mt-6 text-base sm:text-lg">$19/month</p>
            <p className="text-indigo-700 dark:text-gray-300 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg">For small teams just getting started.</p>
          </div>
          <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-6 sm:p-8 md:p-12 text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-indigo-900 dark:text-white">Pro</h3>
            <p className="text-indigo-700 dark:text-gray-300 mt-4 sm:mt-6 text-base sm:text-lg">$49/month</p>
            <p className="text-indigo-700 dark:text-gray-300 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg">For growing teams with advanced needs.</p>
          </div>
          <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-6 sm:p-8 md:p-12 text-center sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-indigo-900 dark:text-white">Enterprise</h3>
            <p className="text-indigo-700 dark:text-gray-300 mt-4 sm:mt-6 text-base sm:text-lg">Custom Pricing</p>
            <p className="text-indigo-700 dark:text-gray-300 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg">For large organizations with custom requirements.</p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="mb-12 sm:mb-16 md:mb-20" id="reviews">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-900 dark:text-white mb-6 sm:mb-8 md:mb-12 text-center px-4">What Our Customers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12 px-4">
          <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-6 sm:p-8 md:p-12">
            <p className="text-indigo-700 dark:text-gray-300 text-sm sm:text-base md:text-lg">
              "EdgeLead has transformed the way we manage our sales pipeline. Highly recommend!"
            </p>
            <p className="text-indigo-900 dark:text-white font-bold mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl">- Sarah Johnson</p>
          </div>
          <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-6 sm:p-8 md:p-12">
            <p className="text-indigo-700 dark:text-gray-300 text-sm sm:text-base md:text-lg">
              "The insights and analytics provided by EdgeLead are invaluable to our team."
            </p>
            <p className="text-indigo-900 dark:text-white font-bold mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl">- Michael Lee</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 dark:bg-gray-800 text-white py-8 sm:py-10 md:py-12 mt-12 sm:mt-16 md:mt-20">
        <div className="text-center px-4">
          <p className="text-sm sm:text-base md:text-lg">&copy; {new Date().getFullYear()} EdgeLead. All rights reserved.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mt-4 text-sm sm:text-base md:text-lg">
            <a href="/privacy" className="text-indigo-300 dark:text-gray-400 hover:text-white">Privacy Policy</a>
            <span className="hidden sm:inline">|</span>
            <a href="/terms" className="text-indigo-300 dark:text-gray-400 hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
