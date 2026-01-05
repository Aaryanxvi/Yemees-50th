import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const images = [
    "64c7d078-342f-48c3-a902-f6ba8c203f9b.JPG",
    "6e2e02a9-.JPG",
    "Francis & DJ at Copa.jpg",
    "IMG_0916.jpg",
    "IMG_1034.jpg",
    "IMG_1176.jpg",
    "IMG_1377.JPG",
    "IMG_1569.JPG",
    "IMG_2013.JPG",
    "IMG_2357.jpg",
    "IMG_2694.JPG",
    "IMG_3382.JPG",
    "IMG_4086.jpg",
    "IMG_5906.JPEG",
    "IMG_5919.JPG",
    "IMG_6357.jpg",
    "IMG_6430.JPG",
    "IMG_6633.JPEG",
    "IMG_7894.JPEG",
    "IMG_8479.JPEG",
    "IMG_8647.JPEG",
    "IMG_9837.JPG",
    "Yemee (Barb) Dad.jpg",
    "_tmp1B_image.JPG",
    "b9884f31-7a4d-4a76-8cb1-bf9e3e67be9f.JPG",
    "d6ed663c-3955-4b2f-933c-7def1291d812.JPG",
    "image 1.JPG",
    "image 1.PNG",
    "image 10.png",
    "image 12.png",
    "image 2.JPG",
    "image 2.PNG",
    "image 3.JPG",
    "image 4.JPG",
    "image 4.PNG",
    "image 5.JPG",
    "image 5.PNG",
    "image 6.JPG",
    "image 6.PNG",
    "image 7.PNG",
    "image 7.jpg",
    "image 8.PNG",
    "image 8.jpg",
    "image 9.PNG",
    "image 9.jpg",
    "image.JPG",
    "image.PNG"
];

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Consistently seeded random helper
    const seededRandom = (seed: number) => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };

    const scatteredImagesData = useMemo(() => {
        // Deduplicate images first
        const uniqueImages = Array.from(new Set(images));

        // Use all unique images
        const pool = uniqueImages;
        const phi = 137.5; // Golden Angle

        return pool.map((img, i) => {
            // SPHERICAL/SPIRAL DISTRIBUTION (Vogel Spiral)
            const index = i + 12; // Start slightly further out

            // Distance from center (radius)
            const distance = Math.sqrt(index) * 150;

            const theta = index * phi * (Math.PI / 180);

            const x = Math.cos(theta) * distance;
            const y = Math.sin(theta) * distance;

            const rotate = (seededRandom(i * 789) * 30) - 15;
            const scale = 0.85 + (seededRandom(i * 101) * 0.3);

            return {
                src: img,
                x,
                y,
                rotate,
                scale,
                zIndex: Math.floor(seededRandom(i * 111) * 30),
            };
        });
    }, []);

    const featuredImages = [
        { src: "/gallery/featured-1.png", x: -320, y: 50, rotate: -6, z: 40, label: "Featured Left" },
        { src: "/assets/images/hero-vintage-baby.png", x: 0, y: -20, rotate: 2, z: 50, label: "Hero Center" },
        { src: "/gallery/featured-2.png", x: 320, y: 50, rotate: 5, z: 40, label: "Featured Right" },
    ];

    return (
        <section className="py-20 bg-[#080808] relative overflow-hidden min-h-[1600px] flex flex-col items-center justify-center border-t border-gold/10">
            {/* Texture */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-grain mix-blend-overlay"></div>

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)] z-20"></div>

            <div className="text-center z-30 w-full mb-12 absolute top-20 pointer-events-none">
                <span className="text-gold text-xs tracking-[0.6em] uppercase block mb-4">Timeless Moments</span>
                <h2 className="text-4xl md:text-6xl font-serif text-text italic font-light drop-shadow-lg">The Gallery</h2>
            </div>

            <div className="relative w-full h-[1400px] flex items-center justify-center overflow-hidden translate-y-[100px]">
                {/* Scaled container to fit the large scattered arrangement */}
                <div className="relative w-[2400px] h-[2400px] flex items-center justify-center scale-[0.35] md:scale-[0.45] lg:scale-[0.55] origin-center transition-transform duration-1000">

                    {/* SCATTERED BACKGROUND IMAGES */}
                    {scatteredImagesData.map((img, i) => (
                        <motion.div
                            key={`scatter-${i}`}
                            className="absolute bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer group transition-all duration-300 ease-out"
                            style={{
                                x: img.x,
                                y: img.y,
                                rotate: img.rotate,
                                zIndex: img.zIndex,
                            }}
                            whileHover={{
                                scale: 1.3,
                                rotate: 0,
                                zIndex: 100, // Force top on hover
                                transition: { duration: 0.2 }
                            }}
                            onClick={() => setSelectedImage(img.src)}
                        >
                            <div className="w-[180px] h-[240px] overflow-hidden bg-gray-100 relative">
                                <img
                                    src={`/gallery/${img.src}`}
                                    alt="Memory"
                                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-sepia-[.2] opacity-20 pointer-events-none mix-blend-multiply"></div>
                            </div>
                        </motion.div>
                    ))}

                    {/* CENTER TRIO (Always on top of scatter, but can be hovered) */}
                    {featuredImages.map((img, index) => (
                        <motion.div
                            key={`featured-${index}`}
                            className="absolute bg-white p-4 pb-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer group"
                            style={{
                                zIndex: img.z,
                                x: img.x,
                                y: img.y,
                                rotate: img.rotate,
                            }}
                            whileHover={{
                                scale: 1.05,
                                zIndex: 100,
                                rotate: 0,
                                y: img.y - 20,
                                transition: { type: "spring", stiffness: 300, damping: 20 }
                            }}
                            onClick={() => setSelectedImage(img.src)}
                        >
                            <div className="w-[300px] h-[400px] overflow-hidden bg-black relative border border-gray-100">
                                <img
                                    src={img.src}
                                    alt={img.label}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Glossy Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Golden Center Glow (Behind Trio) */}
                    <div className="absolute w-[800px] h-[600px] bg-gold/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none z-[25]"></div>

                </div>
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 px-4 backdrop-blur-md"
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-6 right-6 text-gold/50 hover:text-gold transition-colors"
                        >
                            <X size={32} />
                        </button>
                        <motion.img
                            src={selectedImage.startsWith('/') ? selectedImage : `/gallery/${selectedImage}`}
                            alt="Selected memory"
                            className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl border-[12px] border-white/90"
                            initial={{ scale: 0.9, rotate: -2 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0.9, rotate: 2 }}
                            transition={{ type: "spring", damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
