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
              <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg">
                Ocean Blue
              </button>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg">
                Teal Wave
              </button>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-cyan-300 to-blue-600 hover:from-cyan-400 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg">
                Deep Sea
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-300">Sunset Gradients</h3>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg">
                Sunset Orange
              </button>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white font-semibold rounded-xl shadow-lg">
                Pink Sunset
              </button>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg">
                Fire Gradient
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-300">Galaxy Gradients</h3>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg">
                Galaxy Purple
              </button>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg">
                Space Indigo
              </button>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-400 to-blue-500 hover:from-purple-500 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg">
                Cosmic Blue
              </button>
            </div>
          </div>
        </div>

        {/* Candy Style Buttons */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-pink-400">Candy Style Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              className="px-6 py-4 bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 text-white font-bold rounded-full border-2 border-pink-300"
              style={{boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.3), 0 10px 25px rgba(236,72,153,0.3)'}}
            >
              Bubblegum
            </button>
            <button 
              className="px-6 py-4 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 text-white font-bold rounded-full border-2 border-purple-300"
              style={{boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.3), 0 10px 25px rgba(168,85,247,0.3)'}}
            >
              Grape Candy
            </button>
            <button 
              className="px-6 py-4 bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white font-bold rounded-full border-2 border-green-300"
              style={{boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.3), 0 10px 25px rgba(34,197,94,0.3)'}}
            >
              Mint Fresh
            </button>
            <button 
              className="px-6 py-4 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white font-bold rounded-full border-2 border-orange-300"
              style={{boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.3), 0 10px 25px rgba(249,115,22,0.3)'}}
            >
              Orange Pop
            </button>
            <button 
              className="px-6 py-4 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-gray-800 font-bold rounded-full border-2 border-yellow-300"
              style={{boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.2), 0 10px 25px rgba(250,204,21,0.3)'}}
            >
              Lemon Drop
            </button>
            <button 
              className="px-6 py-4 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-white font-bold rounded-full border-2 border-blue-300"
              style={{boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.3), 0 10px 25px rgba(59,130,246,0.3)'}}
            >
              Blue Razz
            </button>
            <button 
              className="px-6 py-4 bg-gradient-to-br from-red-400 via-red-500 to-red-600 text-white font-bold rounded-full border-2 border-red-300"
              style={{boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.3), 0 10px 25px rgba(239,68,68,0.3)'}}
            >
              Cherry Pop
            </button>
            <button 
              className="px-6 py-4 bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 text-white font-bold rounded-full border-2 border-cyan-300"
              style={{boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.3), 0 10px 25px rgba(34,211,238,0.3)'}}
            >
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
              <button className="w-full px-8 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-50 shadow-sm border border-gray-200">
                Pure White
              </button>
              <button className="w-full px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 shadow-sm border border-gray-700">
                Midnight Black
              </button>
              <button className="w-full px-8 py-3 bg-transparent text-white font-medium rounded-lg hover:bg-white/10 border border-white/20">
                Ghost Button
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-400">Subtle Colors</h3>
              <button className="w-full px-8 py-3 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 shadow-sm">
                Soft Blue
              </button>
              <button className="w-full px-8 py-3 bg-green-50 text-green-600 font-medium rounded-lg hover:bg-green-100 shadow-sm">
                Soft Green
              </button>
              <button className="w-full px-8 py-3 bg-purple-50 text-purple-600 font-medium rounded-lg hover:bg-purple-100 shadow-sm">
                Soft Purple
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-400">Outlined Style</h3>
              <button className="w-full px-8 py-3 bg-transparent text-blue-400 font-medium rounded-lg hover:bg-blue-400 hover:text-white border-2 border-blue-400">
                Outline Blue
              </button>
              <button className="w-full px-8 py-3 bg-transparent text-green-400 font-medium rounded-lg hover:bg-green-400 hover:text-white border-2 border-green-400">
                Outline Green
              </button>
              <button className="w-full px-8 py-3 bg-transparent text-purple-400 font-medium rounded-lg hover:bg-purple-400 hover:text-white border-2 border-purple-400">
                Outline Purple
              </button>
            </div>
          </div>
        </div>

        {/* Gaming Style Buttons */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-green-400">Gaming Style</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button className="px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg shadow-lg border-b-4 border-green-600 hover:border-green-700">
              Power Up
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg shadow-lg border-b-4 border-red-600 hover:border-red-700">
              Attack Mode
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg shadow-lg border-b-4 border-orange-600 hover:border-orange-700">
              Boost Speed
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-lg shadow-lg border-b-4 border-indigo-700 hover:border-indigo-800">
              Magic Shield
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-bold rounded-lg shadow-lg border-b-4 border-gray-700 hover:border-gray-800">
              Stealth Mode
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-teal-500 text-white font-bold rounded-lg shadow-lg border-b-4 border-teal-600 hover:border-teal-700">
              Ice Freeze
            </button>
          </div>
        </div>

        {/* Special Effect Buttons */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-yellow-400">Special Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-2xl">
              Pulsing Effect
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl shadow-2xl">
              Tilt on Hover
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-bold rounded-xl shadow-2xl relative overflow-hidden">
              <span className="relative z-10">Shimmer Effect</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full"></div>
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-2xl border-2 border-orange-300 hover:border-orange-200">
              Glow Border
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl shadow-2xl relative">
              <span className="relative z-10">Multi Shadow</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur-sm opacity-50"></div>
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold rounded-xl shadow-2xl hover:bg-gradient-to-l">
              Reverse Gradient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}