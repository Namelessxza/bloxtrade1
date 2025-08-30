import { Button } from "@/components/ui/button";

export default function Components() {
  return (
    <div className="min-h-screen bg-[#09101D] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Button Components Collection
        </h1>
        
        {/* Gradient Buttons */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-cyan-400">Gradient Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-300">Ocean Gradients</h3>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg">
                Ocean Blue
              </button>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg">
                Teal Wave
              </button>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-cyan-300 to-blue-600 hover:from-cyan-400 hover:to-blue-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg">
                Deep Sea
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-300">Sunset Gradients</h3>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg">
                Sunset Orange
              </button>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg">
                Pink Sunset
              </button>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg">
                Fire Gradient
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-300">Galaxy Gradients</h3>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg">
                Galaxy Purple
              </button>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg">
                Space Indigo
              </button>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-400 to-blue-500 hover:from-purple-500 hover:to-blue-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg">
                Cosmic Blue
              </button>
            </div>
          </div>
        </div>

        {/* Candy Style Buttons */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-pink-400">Candy Style Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="px-6 py-4 bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 text-white font-bold rounded-full shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-pink-500/50 border-2 border-pink-300">
              Bubblegum
            </button>
            <button className="px-6 py-4 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 text-white font-bold rounded-full shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-purple-500/50 border-2 border-purple-300">
              Grape Candy
            </button>
            <button className="px-6 py-4 bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white font-bold rounded-full shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-green-500/50 border-2 border-green-300">
              Mint Fresh
            </button>
            <button className="px-6 py-4 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white font-bold rounded-full shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-orange-500/50 border-2 border-orange-300">
              Orange Pop
            </button>
            <button className="px-6 py-4 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-gray-800 font-bold rounded-full shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-yellow-500/50 border-2 border-yellow-300">
              Lemon Drop
            </button>
            <button className="px-6 py-4 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-white font-bold rounded-full shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-blue-500/50 border-2 border-blue-300">
              Blue Razz
            </button>
            <button className="px-6 py-4 bg-gradient-to-br from-red-400 via-red-500 to-red-600 text-white font-bold rounded-full shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-red-500/50 border-2 border-red-300">
              Cherry Pop
            </button>
            <button className="px-6 py-4 bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 text-white font-bold rounded-full shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-cyan-500/50 border-2 border-cyan-300">
              Ice Blue
            </button>
          </div>
        </div>

        {/* Modern Minimalist Buttons */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-slate-300">Modern Minimalist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-400">Clean & Simple</h3>
              <button className="w-full px-8 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm border border-gray-200">
                Pure White
              </button>
              <button className="w-full px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm border border-gray-700">
                Midnight Black
              </button>
              <button className="w-full px-8 py-3 bg-transparent text-white font-medium rounded-lg hover:bg-white/10 transition-colors border border-white/20">
                Ghost Button
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-400">Subtle Colors</h3>
              <button className="w-full px-8 py-3 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors shadow-sm">
                Soft Blue
              </button>
              <button className="w-full px-8 py-3 bg-green-50 text-green-600 font-medium rounded-lg hover:bg-green-100 transition-colors shadow-sm">
                Soft Green
              </button>
              <button className="w-full px-8 py-3 bg-purple-50 text-purple-600 font-medium rounded-lg hover:bg-purple-100 transition-colors shadow-sm">
                Soft Purple
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-400">Outlined Style</h3>
              <button className="w-full px-8 py-3 bg-transparent text-blue-400 font-medium rounded-lg hover:bg-blue-400 hover:text-white transition-all border-2 border-blue-400">
                Outline Blue
              </button>
              <button className="w-full px-8 py-3 bg-transparent text-green-400 font-medium rounded-lg hover:bg-green-400 hover:text-white transition-all border-2 border-green-400">
                Outline Green
              </button>
              <button className="w-full px-8 py-3 bg-transparent text-purple-400 font-medium rounded-lg hover:bg-purple-400 hover:text-white transition-all border-2 border-purple-400">
                Outline Purple
              </button>
            </div>
          </div>
        </div>

        {/* Gaming Style Buttons */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-green-400">Gaming Style</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button className="px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300 border-b-4 border-green-600 hover:border-green-700">
              Power Up
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300 border-b-4 border-red-600 hover:border-red-700">
              Attack Mode
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300 border-b-4 border-orange-600 hover:border-orange-700">
              Boost Speed
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 border-b-4 border-indigo-700 hover:border-indigo-800">
              Magic Shield
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-bold rounded-lg shadow-lg hover:shadow-gray-500/50 transform hover:scale-105 transition-all duration-300 border-b-4 border-gray-700 hover:border-gray-800">
              Stealth Mode
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-teal-500 text-white font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 border-b-4 border-teal-600 hover:border-teal-700">
              Ice Freeze
            </button>
          </div>
        </div>

        {/* Special Effect Buttons */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-yellow-400">Special Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-purple-500/75 transform hover:scale-110 transition-all duration-500 animate-pulse">
              Pulsing Effect
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl shadow-2xl hover:shadow-pink-500/75 transform hover:rotate-2 hover:scale-105 transition-all duration-300">
              Tilt on Hover
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-bold rounded-xl shadow-2xl hover:shadow-emerald-500/75 transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <span className="relative z-10">Shimmer Effect</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-2xl hover:shadow-orange-500/75 transform hover:scale-105 transition-all duration-300 border-2 border-orange-300 hover:border-orange-200">
              Glow Border
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-indigo-500/75 transform hover:scale-105 transition-all duration-300 relative">
              <span className="relative z-10">Multi Shadow</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur-sm opacity-50"></div>
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold rounded-xl shadow-2xl hover:shadow-teal-500/75 transform hover:scale-105 transition-all duration-300 hover:bg-gradient-to-l">
              Reverse Gradient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}