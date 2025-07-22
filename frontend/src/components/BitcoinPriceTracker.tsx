import React, { useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  animate,
  useMotionValueEvent
} from 'framer-motion';


interface BitcoinData {
  price: number;
  change24h: number;
  changePercent24h: number;
  lastUpdated: string;
  timestamp: number;
}

const BitcoinPriceTracker: React.FC = () => {
  const [bitcoinData, setBitcoinData] = useState<BitcoinData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // motion‐values
  const priceMV = useMotionValue(0);

  // springs
  const priceSpring = useSpring(priceMV, { stiffness: 200, damping: 30 });

  // React state to render motions
  const [displayPrice, setDisplayPrice] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useMotionValueEvent(priceSpring, 'change', v => setDisplayPrice(v));

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Remove getApiBaseUrl and use a hard-coded URL
  const apiBaseUrl = "https://tatari-backend.onrender.com";

  // fetch + animate
  const fetchBitcoinPrice = async () => {
    setError(null);

    try {
      const apiUrl = `${apiBaseUrl}/api/v1/bitcoin/price`;
      
      console.log('Fetching Bitcoin price from:', apiUrl);
      const res = await fetch(apiUrl, { 
        signal: AbortSignal.timeout(5000) 
      });
      
      console.log('Response status:', res.status);
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      console.log('Received data:', data);

      const price = data.price;
      const change24h = data.change24h;
      const changePercent24h = data.changePercent24h;
      const lastUpdated = data.lastUpdated 
        ? new Date(data.lastUpdated * 1000).toLocaleTimeString()
        : new Date().toLocaleTimeString();

      const newData: BitcoinData = {
        price,
        change24h,
        changePercent24h,
        lastUpdated,
        timestamp: Date.now()
      };
      setBitcoinData(newData);

      // animate to new numbers
      animate(priceMV, price, { type: 'spring', stiffness: 200, damping: 30 });
    } catch (e) {
      console.error('Bitcoin price fetch failed:', e);
      console.error('Error details:', {
        name: e.name,
        message: e.message,
        stack: e.stack
      });
      setError('Unable to fetch price. Retrying…');
    }
  };

  // recursive schedule to guarantee 5s between end→start
  useEffect(() => {
    let mounted = true;
    const schedule = async () => {
      if (!mounted) return;
      await fetchBitcoinPrice();
      if (!mounted) return;
      setTimeout(schedule, 5000);
    };
    schedule();
    return () => { mounted = false; };
  }, []);

  // initial loading placeholder until first successful fetch
  if (!bitcoinData) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-8 mb-16 text-center">
        <motion.span
          className="text-4xl font-bold text-white"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Loading…
        </motion.span>
        {error && <p className="text-yellow-400 mt-2">{error}</p>}
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(displayPrice);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 sm:px-8 mb-16"
    >
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">Live Bitcoin Price</h3>
          <p className="text-white/60 text-sm">
            {currentTime.toLocaleTimeString()}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          {/* Current Price */}
          <div className="text-center">
            <motion.div className="text-6xl font-bold text-white mb-4">
              {formattedPrice}
            </motion.div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-white/40 text-xs">
            Last updated: {bitcoinData.lastUpdated}
          </p>
          {error && <p className="text-yellow-400 text-xs mt-1">{error}</p>}
        </div>
      </div>
    </motion.div>
  );
};

export default BitcoinPriceTracker;
