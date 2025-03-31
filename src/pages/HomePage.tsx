import React from "react";
import CRMDashboard from "../assets/crm_dashboard.png"; 

export default function HomePage() {
  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="mb-20 text-center pt-20">
        <h1 className="text-6xl font-extrabold text-indigo-900 dark:text-white">Welcome to EdgeLead</h1>
        <p className="text-indigo-700 dark:text-gray-300 mt-8 text-2xl">
          Your ultimate CRM solution for modern sales teams.
        </p>
        <p className="text-indigo-700 dark:text-gray-400 mt-6 text-lg max-w-3xl mx-auto">
          EdgeLead empowers your team to manage leads, track deals, and optimize workflows with ease. 
          Designed for efficiency and scalability, our platform ensures you stay ahead in the competitive sales landscape.
        </p>
        <div className="mt-12 flex justify-center space-x-6">
          <a
            href="/get-started"
            className="bg-indigo-900 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-indigo-700 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
          >
            Get Started
          </a>
          <a
            href="/learn-more"
            className="bg-indigo-50 text-indigo-900 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-indigo-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition"
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
      <section className="mb-20" id="products">
        <h2 className="text-4xl font-bold text-indigo-900 dark:text-white mb-12 text-center">Why Choose EdgeLead?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-12 text-center">
            <h3 className="text-3xl font-semibold text-indigo-900 dark:text-white">Streamlined Workflow</h3>
            <p className="text-indigo-700 dark:text-gray-300 mt-6 text-lg">
              Manage your leads, deals, and tasks all in one place with ease.
            </p>
          </div>
          <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-12 text-center">
            <h3 className="text-3xl font-semibold text-indigo-900 dark:text-white">Data-Driven Insights</h3>
            <p className="text-indigo-700 dark:text-gray-300 mt-6 text-lg">
              Make informed decisions with real-time analytics and reporting.
            </p>
          </div>
          <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-12 text-center">
            <h3 className="text-3xl font-semibold text-indigo-900 dark:text-white">Seamless Integration</h3>
            <p className="text-indigo-700 dark:text-gray-300 mt-6 text-lg">
              Integrate with your favorite tools for a unified experience.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-20" id="faq">
        <div className="space-y-12">
          <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-12">
            <h3 className="text-2xl font-semibold text-indigo-900 dark:text-white">What is EdgeLead?</h3>
            <p className="text-indigo-700 dark:text-gray-300 mt-6 text-lg">
              EdgeLead is a CRM platform designed to help sales teams manage leads, track deals, and grow revenue.
            </p>
          </div>
          <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-12">
            <h3 className="text-2xl font-semibold text-indigo-900 dark:text-white">Is there a free trial?</h3>
            <p className="text-indigo-700 dark:text-gray-300 mt-6 text-lg">
              Yes, we offer a 14-day free trial with no credit card required.
            </p>
          </div>
          <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-12">
            <h3 className="text-2xl font-semibold text-indigo-900 dark:text-white">Can I cancel anytime?</h3>
            <p className="text-indigo-700 dark:text-gray-300 mt-6 text-lg">
              Absolutely! You can cancel your subscription at any time without any penalties.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="mb-20" id="pricing">
        <h2 className="text-4xl font-bold text-indigo-900 dark:text-white mb-12 text-center">Pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-12 text-center">
            <h3 className="text-3xl font-semibold text-indigo-900 dark:text-white">Basic</h3>
            <p className="text-indigo-700 dark:text-gray-300 mt-6 text-lg">$19/month</p>
            <p className="text-indigo-700 dark:text-gray-300 mt-6 text-lg">For small teams just getting started.</p>
          </div>
          <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-12 text-center">
            <h3 className="text-3xl font-semibold text-indigo-900 dark:text-white">Pro</h3>
            <p className="text-indigo-700 dark:text-gray-300 mt-6 text-lg">$49/month</p>
            <p className="text-indigo-700 dark:text-gray-300 mt-6 text-lg">For growing teams with advanced needs.</p>
          </div>
          <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-12 text-center">
            <h3 className="text-3xl font-semibold text-indigo-900 dark:text-white">Enterprise</h3>
            <p className="text-indigo-700 dark:text-gray-300 mt-6 text-lg">Custom Pricing</p>
            <p className="text-indigo-700 dark:text-gray-300 mt-6 text-lg">For large organizations with custom requirements.</p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="mb-20" id="reviews">
        <h2 className="text-4xl font-bold text-indigo-900 dark:text-white mb-12 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-12">
            <p className="text-indigo-700 dark:text-gray-300 text-lg">
              "EdgeLead has transformed the way we manage our sales pipeline. Highly recommend!"
            </p>
            <p className="text-indigo-900 dark:text-white font-bold mt-8 text-xl">- Sarah Johnson</p>
          </div>
          <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-12">
            <p className="text-indigo-700 dark:text-gray-300 text-lg">
              "The insights and analytics provided by EdgeLead are invaluable to our team."
            </p>
            <p className="text-indigo-900 dark:text-white font-bold mt-8 text-xl">- Michael Lee</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 dark:bg-gray-800 text-white py-12 mt-20">
        <div className="text-center">
          <p className="text-lg">&copy; {new Date().getFullYear()} EdgeLead. All rights reserved.</p>
          <a href="/privacy" className="text-indigo-300 dark:text-gray-400 hover:text-white text-lg">Privacy Policy</a> | 
          <a href="/privacy" className="text-indigo-300 dark:text-gray-400 hover:text-white text-lg">Privacy Policy</a> |{" "}
          <a href="/terms" className="text-indigo-300 dark:text-gray-400 hover:text-white text-lg">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
