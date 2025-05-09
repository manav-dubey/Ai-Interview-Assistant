import React from 'react'
import { Button } from '@/components/ui/button';
import Head from 'next/head';
import Contect from './_components/Contect';
import { 
  Lightbulb, 
  Target, 
  Rocket, 
  BookOpen, 
  MessageCircle, 
  Award 
} from 'lucide-react';

const page = () => {
  return (
    <div className="bg-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-pattern pointer-events-none"></div>

      <Head>
        <title>Interview AI | Your Career Launchpad</title>
        <meta name="description" content="Transform your interview skills with intelligent, personalized coaching" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative z-10">
        {/* Header with Dynamic Navigation */}
        <header className="w-full py-6 bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
          <div className="container mx-auto flex flex-row justify-between items-center px-6">
            <div className="flex items-center">
              <Rocket className="text-teal-600 mr-3" size={36} />
              <h1 className="text-3xl font-bold text-teal-800">Interview AI</h1>
            </div>
            <nav className="flex space-x-6 items-center">
              <a href="#features" className="group relative text-gray-700 hover:text-teal-600 transition-all">
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all"></span>
              </a>
              <a href="#testimonials" className="group relative text-gray-700 hover:text-teal-600 transition-all">
                Stories
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all"></span>
              </a>
              <a href="#contact" className="group relative text-gray-700 hover:text-teal-600 transition-all">
                Connect
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all"></span>
              </a>
            </nav>
          </div>
        </header>
                <section id="features" className="py-16 bg-[#1E293B] px-6 md:px-0">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-teal-200">Innovative Features</h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Cutting-edge tools designed to refine your professional communication and interview strategies
            </p>
            <div className="flex flex-wrap justify-center mt-12">
  <div className="w-full md:w-1/3 px-4 py-6 transform transition-all duration-500 ease-in-out">
    <div className="bg-[#334155] rounded-xl p-8 shadow-2xl 
      hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] 
      hover:translate-y-[-10px] 
      hover:border-2 
      border-transparent 
      hover:border-teal-500 
      transition-all 
      duration-500 
      group 
      relative 
      overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      <div className="relative z-10">
        <h3 className="text-2xl font-semibold text-teal-300 transition-all duration-300 group-hover:text-teal-200">
          AI-Powered Interviews
        </h3>
        <p className="mt-4 text-gray-300 transition-all duration-300 group-hover:text-gray-200">
          Immersive simulation of real-world interview scenarios with intelligent, adaptive AI
        </p>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      </div>
    </div>
  </div>
  <div className="w-full md:w-1/3 px-4 py-6 transform transition-all duration-500 ease-in-out">
    <div className="bg-[#334155] rounded-xl p-8 shadow-2xl 
      hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] 
      hover:translate-y-[-10px] 
      hover:border-2 
      border-transparent 
      hover:border-teal-500 
      transition-all 
      duration-500 
      group 
      relative 
      overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      <div className="relative z-10">
        <h3 className="text-2xl font-semibold text-teal-300 transition-all duration-300 group-hover:text-teal-200">
          Precision Feedback
        </h3>
        <p className="mt-4 text-gray-300 transition-all duration-300 group-hover:text-gray-200">
          Nuanced, constructive insights tailored to enhance your communication skills
        </p>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      </div>
    </div>
  </div>
  <div className="w-full md:w-1/3 px-4 py-6 transform transition-all duration-500 ease-in-out">
    <div className="bg-[#334155] rounded-xl p-8 shadow-2xl 
      hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] 
      hover:translate-y-[-10px] 
      hover:border-2 
      border-transparent 
      hover:border-teal-500 
      transition-all 
      duration-500 
      group 
      relative 
      overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      <div className="relative z-10">
        <h3 className="text-2xl font-semibold text-teal-300 transition-all duration-300 group-hover:text-teal-200">
          Comprehensive Analysis
        </h3>
        <p className="mt-4 text-gray-300 transition-all duration-300 group-hover:text-gray-200">
          Detailed performance reports mapping your professional growth trajectory
        </p>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      </div>
    </div>
  </div>
</div>
          </div>
        </section>
        {/* Hero Section with Dynamic Elements */}
        <section className="relative py-24 bg-gradient-to-br from-white via-teal-50 to-white">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                  <circle cx="25" cy="25" r="2" fill="#2DD4BF" opacity="0.3" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400 mb-6">
                Master Your Interview Narrative
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Transform interview anxiety into confident storytelling with AI-powered personalized coaching
              </p>
              <div className="flex justify-center space-x-6">
                <a 
                  href="/dashboard" 
                  className="px-10 py-4 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all transform hover:-translate-y-1 shadow-lg"
                >
                  Start Your Journey
                </a>
                <a 
                  href="#features" 
                  className="px-10 py-4 border-2 border-teal-600 text-teal-700 rounded-full hover:bg-teal-50 transition-all"
                >
                  Explore Features
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section with Interactive Cards */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-teal-800 mb-4">Your AI Career Companion</h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Innovative tools that adapt to your unique professional journey
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  icon: <Lightbulb className="text-teal-600" size={48} />, 
                  title: "Intelligent Simulations", 
                  description: "Immersive AI-powered interview scenarios tailored to your industry" 
                },
                { 
                  icon: <Target className="text-teal-600" size={48} />, 
                  title: "Precision Feedback", 
                  description: "Nuanced insights to sharpen your communication and strategy" 
                },
                { 
                  icon: <BookOpen className="text-teal-600" size={48} />, 
                  title: "Comprehensive Analysis", 
                  description: "Detailed reports mapping your professional growth trajectory" 
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-teal-50 p-8 rounded-xl hover:shadow-2xl transition-all group"
                >
                  <div className="mb-6 flex justify-center">
                    {feature.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-teal-800 text-center mb-4">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 bg-[#1E293B] px-6 md:px-0">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-teal-200">What Our Users Say</h2>
            <div className="flex flex-wrap justify-center mt-8">
              <div className="w-full md:w-1/2 px-4 py-8">
                <div className="bg-[#334155] rounded-xl p-8 shadow-2xl hover:bg-[#475569] transition-all duration-300">
                  <p className="text-gray-300 text-lg italic">
                    "The Interview AIs were incredibly helpful. I felt much more confident going into my real interview."
                  </p>
                  <h4 className="mt-4 text-lg font-semibold text-teal-300">- Manav Dubey</h4>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-4 py-8">
                <div className="bg-[#334155] rounded-xl p-8 shadow-2xl hover:bg-[#475569] transition-all duration-300">
                  <p className="text-gray-300 text-lg italic">
                    "The feedback was spot on and helped me improve my answers!
                    The Interview AIs were incredibly helpful."
                  </p>
                  <h4 className="mt-4 text-lg font-semibold text-teal-300">- Devansh Mishra</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-14 bg-gradient-to-br from-teal-50 to-white px-4 md:px-0 relative">
  <div className="absolute inset-0 pointer-events-none opacity-10">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dot-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="2" fill="#14B8A6" opacity="0.3" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#dot-pattern)" />
    </svg>
  </div>
  
  <div className="container mx-auto">
    <div className="max-w-2xl mx-auto bg-white/60 backdrop-blur-lg shadow-lg rounded-2xl p-8 relative z-10">
      {/* Contact Form */}
      <div>
      <h2 className="text-2xl font-bold text-teal-600 text-center mb-3">Contact Us</h2>
      <p className="text-sm text-gray-600 text-center mb-4">Let’s connect and build something amazing!</p>


        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-600 focus:outline-none transition-transform transform hover:scale-105 hover:ring-4 hover:ring-teal-600"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-600 focus:outline-none mt-4 transition-transform transform hover:scale-105 hover:ring-4 hover:ring-teal-600"
        />
        <textarea
          placeholder="Your Message"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-600 focus:outline-none mt-4 transition-transform transform hover:scale-105 hover:ring-4 hover:ring-teal-600"
        ></textarea>
        <button className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition transform hover:scale-105">
          Send Message
        </button>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute -top-4 -left-4 w-10 h-10 bg-teal-400 rounded-full opacity-20 blur-md pointer-events-none"></div>
      <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-teal-500 rounded-full opacity-20 blur-xl pointer-events-none"></div>
    </div>
  </div>
</section>




      </main>

      <footer className="bg-teal-900 text-white py-12">
        <div className="container mx-auto text-center">
          <p>© 2025 Interview AI</p>
        </div>
      </footer>
    </div>
  )
}

export default page