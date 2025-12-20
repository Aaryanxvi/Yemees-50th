import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown, Check, Send, Lock, ExternalLink } from 'lucide-react';
import { supabase } from './supabaseClient';
import Gallery from './components/Gallery';
// --- COMPONENTS ---

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full px-6 py-6 md:px-12 z-50 flex justify-between items-center transition-all duration-700 ${isScrolled ? 'bg-bg/95 border-b border-gold/20 py-4 backdrop-blur-md' : 'bg-transparent py-8'
            }`}>
            <div className="font-serif font-bold text-2xl text-gold tracking-tighter uppercase drop-shadow-sm">Yemee 50</div>
            <a href="#rsvp" className="text-text uppercase tracking-[#0.3em] text-[9px] md:text-xs font-semibold group relative hover:text-gold transition-colors duration-500">
                RSVP
                <span className="absolute bottom-[-4px] left-0 w-full h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right group-hover:origin-left"></span>
            </a>
        </nav>
    );
};

const Hero = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    return (
        <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-bg">
            <motion.div style={{ y }} className="absolute inset-0 z-0">
                <img
                    src="/assets/images/hero-vintage-baby.png"
                    alt="Yemee Childhood Memory"
                    className="w-full h-full object-cover opacity-60 scale-105"
                    style={{ filter: 'grayscale(100%) brightness(0.7) contrast(1.5) sepia(0.05)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40"></div>
            </motion.div>

            <motion.div
                style={{ opacity }}
                className="relative z-10 w-full px-6 md:px-12 flex flex-col justify-between h-full py-32 md:py-20"
            >
                <div></div> {/* Spacer */}

                <div className="max-w-[90vw] text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                    >
                        <div className="relative mb-6">
                            <span className="block text-[14px] md:text-[18px] tracking-[0.6em] font-sans uppercase text-gold/80 mb-2">Est. 2026</span>
                            <div className="w-12 h-[1px] bg-gold/40 mx-auto md:mx-0"></div>
                        </div>
                        <h1 className="text-[9.5vw] leading-[1.0] font-serif text-text uppercase tracking-tighter pr-[15px]">
                            Yemee's <br />
                            <span className="italic font-light text-gold-gradient block mt-2 pb-4">50th</span>
                        </h1>
                    </motion.div>
                </div>

                <div className="flex justify-between items-end border-t border-gold/20 pt-12">
                    <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-text/50 max-w-xs leading-relaxed">
                        A Golden Jubilee Celebration<br />
                        <span className="text-gold">Oct 03 — 05 / Goa, India</span>
                    </p>
                    <Countdown />
                </div>
            </motion.div>

            <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-grain mix-blend-overlay"></div>
        </section>
    );
};

const Countdown = () => {
    const calculateTimeLeft = () => {
        const targetDate = new Date('2026-10-03T00:00:00');
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
            };
        }
        return { days: 0, hours: 0, minutes: 0 };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex gap-4 md:gap-10 font-serif bg-gold/5 backdrop-blur-md px-4 py-4 md:px-8 rounded-none border border-gold/20 shadow-2xl">
            {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Mins', value: timeLeft.minutes }
            ].map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                    <span className="text-4xl md:text-6xl font-light text-gold-gradient">
                        {String(item.value).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-gold/40 mt-2">{item.label}</span>
                </div>
            ))}
        </div>
    );
};

const Intro = () => (
    <section className="py-20 md:py-40 bg-bg relative overflow-hidden border-b border-gold/10">
        {/* Artistic Background Element */}
        <div className="absolute top-0 right-0 w-[50vw] h-full bg-sand opacity-20 -skew-x-12 z-0 origin-top"></div>

        <div className="relative z-10 container mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row gap-16 md:gap-32 items-start">
                <div className="md:w-1/3 pt-20">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="block text-gold font-sans text-xs tracking-[0.5em] uppercase mb-8 border-l border-gold pl-6"
                    >
                        The Destination
                    </motion.span>
                    <h2 className="text-5xl md:text-8xl font-serif text-text leading-[0.85] mb-8">
                        The <br /> <i className="text-gold italic font-light">Quiet</i> <br /> Life.
                    </h2>
                    <div className="w-24 h-[1px] bg-gold/30 mt-12"></div>
                </div>

                <div className="md:w-2/3">
                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-4xl md:leading-[1.2] font-serif text-text/90 mb-24 md:indent-[10%] max-w-[95%]"
                    >
                        We gather on the <span className="text-gold italic">pristine</span> shores of Goa to celebrate a milestone.
                        A weekend where time slows down and every sunset is a ceremony.
                    </motion.p>

                    <div className="grid md:grid-cols-2 gap-20">
                        <div className="pt-8 border-t border-gold/10">
                            <p className="font-sans text-xs tracking-[0.5em] uppercase mb-8 text-gold/50">Volume I / The Vibe</p>
                            <p className="text-xl leading-[1.8] text-text/70 font-light pl-0">
                                A tiny emerald land on the west coast of India, Goa is a former Portuguese colony with a rich history.
                                It is not just a place, but a state of mind.
                            </p>
                        </div>
                        <div className="bg-gold/[0.03] p-12 border border-gold/10 backdrop-blur-sm self-start">
                            <p className="font-sans text-xs tracking-[0.5em] uppercase mb-8 text-gold/50">Volume II / Susegad</p>
                            <p className="text-xl leading-[1.8] text-text/70 font-light">
                                The concept of <span className="text-gold italic font-serif text-3xl">susegad</span> — quiet satisfaction — reflects the unique blend of culture here.
                                It is the art of living well, slowly, and with intention.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const Itinerary = () => {
    const [activeTab, setActiveTab] = useState('goa');

    const tabs = [
        { id: 'mumbai', label: 'Mumbai Leg' },
        { id: 'goa', label: 'Goa Celebration' },
        { id: 'departure', label: 'Departure' },
    ];

    const content: Record<string, any[]> = {
        mumbai: [
            { date: 'Sept 28/29, 2026', title: 'Arrival in Mumbai', desc: 'Land in Mumbai. Transfer to accommodation.' },
            { date: 'Sept 30, 2026', title: 'Guided Tour & Dinner', desc: <>Guided tour of Mumbai once numbers are confirmed. <br />Dinner at <a href="https://www.instagram.com/soulfrybandra?igsh=ZGJ0ODk3M3pjb2Vk" target="_blank" className="text-gold underline underline-offset-4">Soul Fry Bandra</a>.</> },
        ],
        goa: [
            { date: 'Oct 1, 2026', title: 'Fly to Goa', desc: 'Group flight to Goa. Check-in at accommodation.' },
            { date: 'Oct 2, 2026', title: 'Old Goa & City Tour', desc: <>Guided tour of Old Goa and town. <br />Group Dinner in Goa.</> },
            { date: 'Oct 3, 2026 • 6:00 PM', title: "Yemee's 50th Party", desc: <>The Main Event at <a href="https://bay15.in/thegallery/" target="_blank" className="text-gold underline underline-offset-4 font-bold">Bay 15 (The Gallery)</a>. <br /></> },
        ],
        departure: [
            { date: 'Oct 4, 2026', title: 'Recovery', desc: 'Relax, beach day, and recovery brunch.' },
            { date: 'Oct 5, 2026', title: 'Depart', desc: 'Fly back home or continue your journey.' },
        ]
    };

    return (
        <section id="itinerary" className="py-20 md:py-32 bg-[#050505] text-text relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent"></div>
            </div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-gold text-xs tracking-[0.6em] uppercase block mb-4">The Schedule</span>
                    <h2 className="text-4xl md:text-6xl font-serif text-text/90 italic font-light">The Itinerary</h2>
                    <div className="w-16 h-[1px] bg-gold/40 mx-auto mt-8"></div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-20 border-b border-gold/10">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-8 py-6 uppercase tracking-[0.4em] text-[9px] md:text-[10px] transition-all duration-700 relative group ${activeTab === tab.id
                                ? 'text-gold'
                                : 'text-text/40 hover:text-text/70'
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-[1px] bg-gold"></motion.div>
                            )}
                        </button>
                    ))}
                </div>

                <div className="min-h-[450px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-16 max-w-3xl mx-auto pl-12 border-l border-gold/10"
                        >
                            {content[activeTab].map((item, index) => (
                                <div key={index} className="relative group">
                                    <span className="absolute -left-[54px] top-1 w-2.5 h-2.5 bg-bg border border-gold rounded-full group-hover:bg-gold transition-colors duration-500 shadow-[0_0_10px_rgba(191,149,63,0.3)]"></span>
                                    <span className="block text-gold/60 font-sans text-[10px] md:text-xs mb-4 tracking-[0.3em] uppercase">{item.date}</span>
                                    <h3 className="text-2xl md:text-3xl font-serif mb-4 text-text/90 group-hover:text-gold transition-colors duration-500">{item.title}</h3>
                                    <p className="text-text/50 font-light leading-loose text-lg max-w-2xl">{item.desc}</p>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

const Chandelier = ({ scrollYProgress }: { scrollYProgress: any }) => {
    const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const chainHeight = useTransform(scrollYProgress, [0, 1], [20, 320]); // Starts at 20px to connect, grows by 300px

    return (
        <div className="absolute -top-20 -left-10 md:-left-10 w-[180px] md:w-[400px] z-20 pointer-events-none mix-blend-screen opacity-90">
            {/* The Chain - Animated */}
            <motion.div
                style={{ height: chainHeight }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-white/20 via-white/50 to-white/80 origin-top z-10"
            ></motion.div>

            {/* The Body - Animated */}
            <motion.div style={{ y }} className="relative z-20">
                {/* Illumination Glow - Golden */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold/20 blur-[80px] rounded-full mix-blend-screen animate-pulse-slow"></div>

                <img
                    src="/assets/images/chandelier.png"
                    alt="Chandelier"
                    className="w-full h-auto drop-shadow-2xl"
                    style={{
                        // Using screen blend mode to make black background transparent while keeping white chandelier bright
                        mixBlendMode: 'screen',
                        filter: 'brightness(1.2) contrast(1.1)' // Slight boost to pop against black bg
                    }}
                />
            </motion.div>
        </div>
    );
};

const Details = () => {
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    return (
        <section ref={ref} id="details" className="py-20 md:py-64 bg-black px-6 relative border-t border-gold/10 overflow-hidden">
            {/* Atmospheric Layers removed for pure black background */}

            <Chandelier scrollYProgress={scrollYProgress} />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Visual & Abstract */}
                    <div className="lg:col-span-6 relative">
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="relative z-10 group"
                        >
                            {/* Elegant Frame Layer */}
                            <div className="absolute -inset-4 md:-inset-8 border border-gold/20 pointer-events-none z-0"></div>

                            <div className="aspect-[3/4] overflow-hidden relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                                <img
                                    src="/assets/images/venue-bay15.jpg"
                                    className="w-full h-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-105"
                                    style={{ filter: 'grayscale(100%) brightness(0.7) contrast(1.2)' }}
                                    alt="Venue Ambiance"
                                />
                                {/* In-image Caption */}
                                <div className="absolute bottom-8 right-8 text-right">
                                    <span className="text-[9px] tracking-[0.4em] uppercase text-gold/80 block mb-2">The Venue</span>
                                    <p className="font-serif text-2xl text-white italic">Bay 15, Dona Paula</p>
                                </div>
                            </div>

                            {/* Floating Decorative Element */}
                            <div className="absolute -left-12 -bottom-12 w-32 h-32 border-l border-b border-gold/30 hidden md:block"></div>
                        </motion.div>
                    </div>

                    {/* Right Column: Narrative & Info */}
                    <div className="lg:col-span-6 relative">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                        >
                            <header className="mb-12">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-[1px] bg-gold"></div>
                                    <span className="text-gold text-xs tracking-[0.4em] uppercase font-bold">The Esthetics</span>
                                </div>
                                <h2 className="text-5xl md:text-7xl font-serif text-white leading-none tracking-tight mb-8">
                                    Coastal <br />
                                    <span className="italic font-light text-gold ml-12">Opulence.</span>
                                </h2>
                                <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md">
                                    A celebration soaked in salt and sun, where the <span className="text-gold italic font-serif">spirit of Goa</span> turns every moment into a memory.
                                </p>
                            </header>

                            <div className="space-y-12 border-l border-gold/20 pl-8 ml-2">
                                <div className="group transition-all duration-500">
                                    <h4 className="text-xs tracking-[0.3em] uppercase text-gold/60 mb-2">Accommodation</h4>
                                    <h3 className="text-4xl font-serif text-white mb-3 group-hover:text-gold transition-colors">Bay 15</h3>
                                    <p className="text-gray-500 text-lg font-light leading-relaxed mb-4 max-w-md">
                                        Accommodation available on a <span className="text-gold italic">first come, first serve</span> basis. Experience the waterfront charm with all modern comforts.
                                    </p>
                                    <div className="flex flex-col gap-1 mb-6">
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-2xl font-serif text-gold">₹6,000</span>
                                            <span className="text-xs tracking-widest text-gray-600 uppercase">(Approx. $100) / Night</span>
                                        </div>
                                        <span className="text-[10px] tracking-widest text-text/30 uppercase">+ taxes, including breakfast</span>
                                    </div>
                                    <a
                                        href="https://staahmax.staah.net/be/securepayment?propertyId=NjYxMg==&tkn=WVc1L01UZHpnL3hsazNoSHlNQU8zR0VWd2dKY2xpeHhQdFNGUWFNMnIvaz0="
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/btn relative inline-flex items-center gap-6 py-2"
                                    >
                                        <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center transition-all duration-500 group-hover/btn:bg-gold group-hover/btn:border-gold">
                                            <ExternalLink className="w-4 h-4 text-gold group-hover/btn:text-black transition-colors" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-white uppercase tracking-[0.2em] text-[10px] font-bold">Book Your Stay</span>
                                            <span className="text-gray-600 text-[9px] tracking-widest uppercase mt-0.5 transition-colors group-hover/btn:text-gold">via Staah Max</span>
                                        </div>
                                    </a>
                                </div>

                                <div className="pt-8 border-t border-gold/10">
                                    <h4 className="text-xs tracking-[0.3em] uppercase text-gold/60 mb-2">Travel & Tours</h4>
                                    <p className="text-gray-500 text-lg font-light leading-relaxed mb-4 max-w-md">
                                        For bookings for tours in India (Golden Triangle etc.), internal flights, or transfers, please contact <span className="text-white font-serif italic">Vikas from YouV Tours</span>.
                                    </p>
                                    <p className="text-xs text-gold/80 tracking-widest uppercase mb-6">
                                        Reference: "Yemee Fernandes"
                                    </p>
                                    <a
                                        href="mailto:youvtours@gmail.com"
                                        className="group/btn relative inline-flex items-center gap-6 py-2"
                                    >
                                        <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center transition-all duration-500 group-hover/btn:bg-gold group-hover/btn:border-gold">
                                            <Send className="w-4 h-4 text-gold group-hover/btn:text-black transition-colors" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-white uppercase tracking-[0.2em] text-[10px] font-bold">Inquire Booking</span>
                                            <span className="text-gray-600 text-[9px] tracking-widest uppercase mt-0.5 transition-colors group-hover/btn:text-gold">youvtours@gmail.com</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Floating Background Accents */}
            <div className="absolute bottom-20 right-10 w-64 h-64 border border-gold/5 rounded-full blur-3xl pointer-events-none"></div>
        </section>
    );
};


const AdminDashboard = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [email, setEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [attendees, setAttendees] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const allowedEmails = [
            'yemee.fernandes@fourpillarstrading.com',
            'aaryanbaadkar71@gmail.com'
        ];

        if (allowedEmails.includes(email.trim().toLowerCase())) {
            setIsLoggedIn(true);
            await fetchAttendees();
        } else {
            setError('Unauthorized access.');
        }
        setLoading(false);
    };

    const fetchAttendees = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('rsvp')
            .select('*')
            .eq('attending', 'Honoured to attend')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching attendees:', error);
            setError('Failed to fetch data.');
        } else {
            setAttendees(data || []);
        }
        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose}></div>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative z-10 w-full max-w-5xl bg-[#0a0a0a] border border-gold/20 p-8 md:p-12 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
                <button onClick={onClose} className="absolute top-6 right-6 text-gold/50 hover:text-gold transition-colors text-xs uppercase tracking-widest">
                    Close
                </button>

                {!isLoggedIn ? (
                    <div className="max-w-md mx-auto text-center py-10">
                        <Lock className="w-8 h-8 text-gold/50 mx-auto mb-6" />
                        <h2 className="font-serif text-4xl text-gold mb-2">Admin Access</h2>
                        <p className="text-text/40 text-xs tracking-widest uppercase mb-8">Restricted Area</p>
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <input
                                    type="email"
                                    placeholder="Enter Admin Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent border-b border-gold/20 py-3 text-text text-lg focus:border-gold outline-none transition-colors text-center placeholder:text-text/20"
                                />
                            </div>
                            {error && <p className="text-red-500 text-xs tracking-widest uppercase">{error}</p>}
                            <button type="submit" className="bg-gold text-black px-8 py-3 uppercase tracking-widest text-sm font-bold hover:bg-white transition-colors">
                                {loading ? 'Verifying...' : 'Login'}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gold/20 pb-6 gap-6">
                            <div>
                                <span className="text-gold text-sm tracking-[0.4em] uppercase block mb-2">Guest List</span>
                                <h2 className="font-serif text-4xl text-white">Honoured to Attend</h2>
                            </div>
                            <div className="text-right flex items-center gap-8">
                                <button onClick={fetchAttendees} className="text-xs uppercase tracking-widest text-gold/50 hover:text-gold">Refresh</button>
                                <div>
                                    <p className="text-gold text-4xl font-serif leading-none">{attendees.length}</p>
                                    <p className="text-text/40 text-xs tracking-widest uppercase mt-1">Confirmed</p>
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <p className="text-center text-gold/50 animate-pulse py-12">Loading data...</p>
                        ) : attendees.length === 0 ? (
                            <p className="text-center text-text/30 py-12 italic font-serif">No responses yet.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead>
                                        <tr className="border-b border-gold/10 text-gold/50 text-xs uppercase tracking-widest">
                                            <th className="py-4 font-normal w-[20%]">Name</th>
                                            <th className="py-4 font-normal w-[25%]">Email</th>
                                            <th className="py-4 font-normal text-center w-[10%] align-top">Guests</th>
                                            <th className="py-4 font-normal w-[20%] pl-8 align-top">Dietary</th>
                                            <th className="py-4 font-normal w-[25%] align-top">Note</th>
                                            <th className="py-4 font-normal text-right align-top pl-8">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-text/90 text-base font-light">
                                        {attendees.map((person) => (
                                            <tr key={person.id} className="border-b border-gold/5 hover:bg-gold/[0.02] transition-colors group align-top">
                                                <td className="py-4 pr-4 font-medium text-gold/90">{person.full_name}</td>
                                                <td className="py-4 pr-4 text-text/60">{person.email}</td>
                                                <td className="py-4 px-4 text-center">{person.guests_count}</td>
                                                <td className="py-4 pr-4 pl-8 text-text/60 whitespace-normal">{person.dietary_requirements || '-'}</td>
                                                <td className="py-4 text-text/60 italic whitespace-normal">{person.note || '-'}</td>
                                                <td className="py-4 text-right text-xs text-text/30 uppercase tracking-wider pl-8">
                                                    {new Date(person.created_at).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

const InputField = ({ label, type = "text", placeholder = "", id, value, onChange, focusedField, setFocusedField }: any) => (
    <div className="relative mb-12 group">
        <label
            htmlFor={id}
            className={`absolute left-0 transition-all duration-500 pointer-events-none font-sans ${focusedField === id || value
                ? '-top-8 text-[10px] text-gold tracking-[0.4em] uppercase'
                : 'top-2 text-text/30 text-sm tracking-widest'
                }`}
        >
            {label}
        </label>
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={focusedField === id ? placeholder : ''}
            className="w-full bg-transparent border-b border-gold/10 py-3 text-text/90 focus:outline-none focus:border-gold transition-colors duration-500 font-sans text-sm"
            onFocus={() => setFocusedField(id)}
            onBlur={() => setFocusedField(null)}
            required={id === 'name' || id === 'email'}
        />
    </div>
);

const RSVPForm = () => {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        attendance: 'Honoured to attend',
        guests: '1',
        diet: '',
        note: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id || e.target.name]: e.target.value });
    };

    const handleRadioChange = (value: string) => {
        setFormData({ ...formData, attendance: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMsg('');

        try {
            const { error } = await supabase.from('rsvp').insert([
                {
                    full_name: formData.name,
                    email: formData.email,
                    attending: formData.attendance,
                    guests_count: parseInt(formData.guests),
                    dietary_requirements: formData.diet,
                    note: formData.note
                }
            ]);

            if (error) throw error;
            setStatus('success');
            setFormData({ name: '', email: '', attendance: 'Honoured to attend', guests: '1', diet: '', note: '' });
        } catch (error: any) {
            console.error('Error submitting RSVP:', error);
            setStatus('error');
            setErrorMsg(error.message || 'Something went wrong. Please try again.');
        }
    };



    return (
        <section id="rsvp" className="py-20 md:py-40 px-6 bg-[#030303] relative border-t border-gold/10">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-24">
                    <span className="text-gold text-xs tracking-[0.6em] uppercase block mb-4">Response</span>
                    <h2 className="text-4xl md:text-6xl font-serif text-text mb-6 italic font-light">RSVP</h2>
                    <p className="text-text/40 tracking-[0.5em] text-[10px] uppercase">Kindly confirm your presence by Aug 2026</p>
                    <div className="w-12 h-[1px] bg-gold/30 mx-auto mt-12"></div>
                </div>

                {status === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gold/5 border border-gold/20 p-12 text-center"
                    >
                        <Check className="w-12 h-12 text-gold mx-auto mb-6" />
                        <h3 className="font-serif text-3xl text-white mb-4">Thank You</h3>
                        <p className="text-text/60 font-light">Your response has been recorded.</p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="mt-8 text-[10px] uppercase tracking-widest text-gold hover:text-white transition-colors"
                        >
                            Send another response
                        </button>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-x-12">
                            <InputField label="Full Name" id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} focusedField={focusedField} setFocusedField={setFocusedField} />
                            <InputField label="Email Address" id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} focusedField={focusedField} setFocusedField={setFocusedField} />
                        </div>

                        <div className="mb-16">
                            <label className="block text-[10px] text-gold/50 tracking-[0.5em] uppercase mb-8">Will you be attending?</label>
                            <div className="flex gap-12">
                                <label className="flex items-center gap-4 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="attendance"
                                        className="peer sr-only"
                                        checked={formData.attendance === 'Honoured to attend'}
                                        onChange={() => handleRadioChange('Honoured to attend')}
                                    />
                                    <div className="w-6 h-6 border border-gold/20 rounded-none peer-checked:bg-gold transition-all relative flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 bg-bg opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                    </div>
                                    <span className={`text-xs tracking-widest uppercase transition-colors ${formData.attendance === 'Honoured to attend' ? 'text-text' : 'text-text/50 group-hover:text-text'}`}>Honoured to attend</span>
                                </label>
                                <label className="flex items-center gap-4 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="attendance"
                                        className="peer sr-only"
                                        checked={formData.attendance === 'Regretfully decline'}
                                        onChange={() => handleRadioChange('Regretfully decline')}
                                    />
                                    <div className="w-6 h-6 border border-gold/20 rounded-none peer-checked:bg-text relative flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 bg-bg opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                    </div>
                                    <span className={`text-xs tracking-widest uppercase transition-colors ${formData.attendance === 'Regretfully decline' ? 'text-text' : 'text-text/50 group-hover:text-text'}`}>Regretfully decline</span>
                                </label>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-x-12">
                            <InputField label="Number of Guests" id="guests" type="number" placeholder="1" value={formData.guests} onChange={handleChange} focusedField={focusedField} setFocusedField={setFocusedField} />
                            <InputField label="Dietary Requirements" id="diet" placeholder="Vegetarian, allergies..." value={formData.diet} onChange={handleChange} focusedField={focusedField} setFocusedField={setFocusedField} />
                        </div>

                        <div className="relative mb-20 group">
                            <label className="block text-[10px] text-gold/50 tracking-[0.5em] uppercase mb-4">A Note for the Hostess</label>
                            <textarea
                                id="note"
                                value={formData.note}
                                onChange={handleChange}
                                className="w-full bg-gold/[0.02] border border-gold/10 p-6 text-text/80 focus:outline-none focus:border-gold transition-colors duration-500 font-sans min-h-[150px] resize-none text-sm placeholder:text-text/10"
                                placeholder="Share your wishes or questions..."
                            ></textarea>
                        </div>

                        {status === 'error' && (
                            <div className="mb-8 p-4 bg-red-900/20 border border-red-900/50 text-red-400 text-xs text-center uppercase tracking-widest">
                                {errorMsg}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full bg-gold hover:bg-gold-light text-bg uppercase tracking-[0.4em] py-6 text-xs font-bold transition-all duration-700 relative group overflow-hidden shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="relative z-10">{status === 'submitting' ? 'Sending...' : 'Submit Response'}</span>
                            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out"></div>
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
};

const Footer = ({ onAdminClick }: { onAdminClick: () => void }) => (
    <footer className="py-20 bg-bg border-t border-gold/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-[0.02] pointer-events-none"></div>
        <div className="max-w-xs mx-auto mb-10">
            <div className="w-full h-[1px] bg-gold/20 mb-10"></div>
            <div className="font-serif text-3xl text-gold italic mb-2">YF</div>
            <div className="text-[10px] tracking-[1em] text-gold/40 uppercase mb-10 ml-[1em]">Golden Jubilee</div>
            <div className="w-full h-[1px] bg-gold/20"></div>
        </div>
        <div className="flex flex-col items-center gap-4">
            <p className="text-text/30 text-[9px] tracking-[0.6em] uppercase">&copy; 2026 / Yemee Fernandes 50th / Goa</p>
            <button key="admin-btn" onClick={onAdminClick} className="text-text/10 hover:text-gold/50 text-[8px] uppercase tracking-widest transition-colors pt-4">
                Admin
            </button>
        </div>
    </footer>
);

// --- MAIN APP ---

function App() {
    const [isAdminOpen, setIsAdminOpen] = useState(false);

    return (
        <main className="bg-bg text-text selection:bg-gold/20">
            <Navigation />
            <Hero />
            <Intro />
            <Itinerary />
            <Details />
            <Gallery />
            <RSVPForm />
            <Footer onAdminClick={() => setIsAdminOpen(true)} />
            <AnimatePresence>
                {isAdminOpen && <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />}
            </AnimatePresence>
        </main>
    );
}

export default App;
