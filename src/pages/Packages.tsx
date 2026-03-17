
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search, Grid, List, ChevronDown, CheckCircle, MapPin, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { PACKAGES } from '../data';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const Packages = () => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [budgetLimit, setBudgetLimit] = useState<number>(500000);
  const [sortOrder, setSortOrder] = useState<string>('popular');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredPackages = PACKAGES.filter(pkg => {
    const categoryMatch = filterCategory === 'All' || pkg.category === filterCategory;
    const budgetMatch = pkg.price <= budgetLimit;
    return categoryMatch && budgetMatch;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-slate-900 text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-blue/20 mix-blend-multiply"></div>
        <div className="max-w-7xl mx-auto space-y-4 relative z-10 text-center md:text-left">
          <nav className="text-xs uppercase font-black text-brand-blue flex items-center justify-center md:justify-start gap-2 tracking-widest mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link> 
            <span className="text-slate-600">/</span> 
            <span className="text-white">Packages</span>
          </nav>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-brand-blue/20 mb-2"
          >
            Curated For You
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tight"
          >
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-400">Packages</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 max-w-2xl text-lg md:text-xl font-medium mx-auto md:mx-0 leading-relaxed"
          >
            Find your perfect getaway from our wide range of curated domestic and international tour options.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6 bg-white p-4 rounded-2xl shadow-lg border border-slate-100 flex justify-between items-center">
          <span className="font-black text-slate-800 text-sm uppercase tracking-wider">Refine Search</span>
          <button 
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)} 
            className="bg-slate-100 text-brand-blue py-2 px-4 rounded-xl shadow-sm flex items-center gap-2 text-sm font-bold transition-transform active:scale-95"
          >
            {isMobileFilterOpen ? <><X size={16}/> Hide Filters</> : <><Filter size={16}/> Show Filters</>}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className={`space-y-6 lg:block ${isMobileFilterOpen ? 'block' : 'hidden'}`}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-xl p-8 rounded-[32px] shadow-xl border border-white"
            >
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                <h3 className="font-black flex items-center gap-2 text-slate-900 text-xl tracking-tight">
                  <Filter size={20} className="text-brand-blue" /> Filter Tours
                </h3>
                <button 
                  onClick={() => { setFilterCategory('All'); setBudgetLimit(500000); }}
                  className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors bg-slate-100 px-3 py-1.5 rounded-full"
                >
                  Clear
                </button>
              </div>

              <div className="space-y-10">
                <div>
                  <h4 className="text-[10px] font-black uppercase text-slate-400 mb-5 tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-orange"></span> Category
                  </h4>
                  <div className="space-y-3">
                    {['All', 'Honeymoon', 'Family', 'Adventure', 'Pilgrimage', 'Beach', 'Hill Station', 'International', 'Nature'].map(cat => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${filterCategory === cat ? 'bg-brand-blue border-brand-blue' : 'border-slate-300 group-hover:border-brand-blue'}`}>
                          {filterCategory === cat && <CheckCircle size={12} className="text-white" />}
                        </div>
                        <input 
                          type="radio" 
                          name="category"
                          checked={filterCategory === cat}
                          onChange={() => setFilterCategory(cat)}
                          className="hidden" 
                        />
                        <span className={`text-sm font-bold transition-colors ${filterCategory === cat ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-900'}`}>
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black uppercase text-slate-400 mb-5 tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-blue"></span> Max Budget
                  </h4>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-4 text-center text-xl font-black text-brand-blue">
                    ₹{budgetLimit.toLocaleString()}
                  </div>
                  <input 
                    type="range" 
                    min="10000" 
                    max="500000" 
                    step="5000"
                    value={budgetLimit}
                    onChange={(e) => setBudgetLimit(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-orange" 
                  />
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mt-3">
                    <span>₹10K</span>
                    <span>₹5L+</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-brand-orange to-red-500 rounded-3xl p-8 text-white text-center space-y-6 shadow-2xl shadow-brand-orange/20 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black tracking-tight leading-tight">Can't find the perfect fit?</h3>
                <p className="text-sm text-white/90 font-medium py-2">Let our AI build a custom itinerary just for you.</p>
                <Link to="/contact" className="block w-full bg-white text-brand-orange py-4 rounded-xl font-black text-sm hover:scale-105 transition-transform shadow-xl">
                  Get Custom Plan
                </Link>
              </div>
            </motion.div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="text-sm font-bold text-gray-500">
                Showing <span className="text-blue-800">{filteredPackages.length}</span> packages found
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <select 
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="bg-gray-50 border-none text-sm font-bold pl-4 pr-10 py-2 rounded-xl outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-blue-800 transition-all"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                    <option value="duration">Duration</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" size={16} />
                </div>
                <div className="flex items-center bg-gray-50 p-1 rounded-xl">
                  <button className="p-2 bg-white text-blue-800 rounded-lg shadow-sm"><Grid size={18} /></button>
                  <button className="p-2 text-gray-400 hover:text-blue-800 transition-colors"><List size={18} /></button>
                </div>
              </div>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredPackages.map((pkg) => (
                <motion.div 
                  variants={fadeInUp}
                  key={pkg.id} 
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-brand-blue/10 transition-all duration-300 group flex flex-col h-full transform-gpu"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={pkg.images[0]} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-slate-900 shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span> {pkg.duration}
                    </div>
                  </div>
                  <div className="p-8 space-y-4 flex-grow flex flex-col relative bg-white">
                    <div className="flex justify-between items-start">
                      <div className="pr-4">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-blue transition-colors leading-tight mb-2">{pkg.name}</h3>
                        <div className="flex items-center text-slate-500 text-sm font-medium">
                          <MapPin size={14} className="mr-1.5 text-brand-orange" /> {pkg.destination}
                        </div>
                      </div>
                      <div className="text-right shrink-0 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Starts from</div>
                        <div className="text-xl font-black text-brand-blue tracking-tight">₹{pkg.price.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                       {pkg.highlights.slice(0, 2).map(h => (
                         <span key={h} className="bg-brand-blue/5 border border-brand-blue/10 text-brand-blue px-3 py-1.5 rounded-xl text-xs font-bold">{h}</span>
                       ))}
                    </div>

                    <div className="pt-6 mt-auto border-t border-slate-100 flex items-center justify-between">
                       <div className="flex items-center gap-1.5">
                          <span className="text-yellow-400 font-bold text-lg">★</span>
                          <span className="font-bold text-slate-800">{pkg.rating}</span>
                          <span className="text-slate-400 text-xs">({pkg.reviewsCount})</span>
                       </div>
                       <Link to={`/package/${pkg.id}`} className="btn-primary py-2.5 px-6">
                         View Details
                       </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
              {filteredPackages.length === 0 && (
                <div className="col-span-2 py-20 text-center space-y-4 bg-white rounded-3xl border border-dashed border-slate-200">
                  <div className="text-6xl text-slate-300">🔍</div>
                  <h3 className="text-2xl font-black text-slate-800">No Packages Found</h3>
                  <p className="text-slate-500 font-medium tracking-wide">Try adjusting your budget limit or category filters.</p>
                  <button onClick={() => { setFilterCategory('All'); setBudgetLimit(500000); }} className="inline-block btn-primary">Reset Filters</button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
