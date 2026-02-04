import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative w-full bg-[#050505] text-white selection:bg-blue-500 selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Image with High-End Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('/home.jpg')" }}
        >
          {/* Dark overlay with a blue-ish tint for professional look */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Next-Gen Performance
            </div>

            <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter">
              i-COMPUTERS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                EVOLVED.
              </span>
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-gray-400 text-lg md:text-xl max-w-lg font-light leading-relaxed"
            >
              Ultimate custom rigs and premium components. We don't just build computers; we craft digital masterpieces.
            </motion.p>

            <div className="mt-10 flex flex-wrap gap-5">
              <Link to="/products">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2"
                >
                  <ShoppingCart size={20} /> Explore Store
                </motion.button>
              </Link>
              <Link to="/contact">
                <button className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full font-bold transition-all">
                  Build Custom PC
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Floating Feature Cards (Desktop Only) */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <FeatureCard icon={<Cpu className="text-blue-500"/>} title="Latest Tech" desc="RTX 40 Series & DDR5" delay={0.2} />
            <FeatureCard icon={<Zap className="text-yellow-500"/>} title="Insane Speed" desc="NVMe Gen5 Ready" delay={0.4} />
            <FeatureCard icon={<ShieldCheck className="text-green-500"/>} title="3yr Warranty" desc="Full Hardware Cover" delay={0.6} />
            <div className="p-6 rounded-3xl bg-blue-600 flex flex-col justify-center items-center text-center">
                <p className="text-3xl font-bold italic">FREE</p>
                <p className="text-sm opacity-80 uppercase tracking-tighter">Shipping over $1000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Blur Orbs */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
    </div>
  );
};

// Sub-component for Feature Cards
const FeatureCard = ({ icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.06] transition-all group"
  >
    <div className="mb-4 transform group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="font-bold text-lg">{title}</h3>
    <p className="text-sm text-gray-500">{desc}</p>
  </motion.div>
);

export default Home;