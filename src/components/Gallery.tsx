import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

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

    return (
        <section className="py-20 md:py-40 bg-bg relative border-t border-gold/10">
            <div className="max-w-[90vw] mx-auto">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-gold text-xs tracking-[0.6em] uppercase block mb-4">Golden Memories</span>
                        <h2 className="text-4xl md:text-6xl font-serif text-text mb-6 italic font-light">The Gallery</h2>
                        <div className="w-12 h-[1px] bg-gold/30 mx-auto mt-12"></div>
                    </motion.div>
                </div>

                <div className="columns-1 md:columns-3 lg:columns-4 gap-8 space-y-8 p-4">
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            layoutId={`image-${index}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: index % 3 * 0.1 }}
                            className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-sm"
                            onClick={() => setSelectedImage(img)}
                        >
                            <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                                <ZoomIn className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" />
                            </div>
                            <img
                                src={`/gallery/${img}`}
                                alt={`Memory ${index + 1}`}
                                loading="lazy"
                                className="w-full h-auto object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                            />
                        </motion.div>
                    ))}
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
                            src={`/gallery/${selectedImage}`}
                            alt="Selected memory"
                            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl border border-gold/10"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
