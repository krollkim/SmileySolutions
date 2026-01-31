"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoAccessibility } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineEye,
  HiOutlinePauseCircle,
  HiOutlineDocumentText,
} from "react-icons/hi2";

interface AccessibilitySettings {
  largeText: boolean;
  highContrast: boolean;
  reduceMotion: boolean;
}

const defaultSettings: AccessibilitySettings = {
  largeText: false,
  highContrast: false,
  reduceMotion: false,
};

// Apply settings to document - defined outside component to avoid hook dependency issues
function applySettings(newSettings: AccessibilitySettings) {
  const root = document.documentElement;

  // Large text
  if (newSettings.largeText) {
    root.classList.add("accessibility-large-text");
  } else {
    root.classList.remove("accessibility-large-text");
  }

  // High contrast
  if (newSettings.highContrast) {
    root.classList.add("accessibility-high-contrast");
  } else {
    root.classList.remove("accessibility-high-contrast");
  }

  // Reduce motion
  if (newSettings.reduceMotion) {
    root.classList.add("accessibility-reduce-motion");
  } else {
    root.classList.remove("accessibility-reduce-motion");
  }
}

// Hydration-safe mounted check using useSyncExternalStore
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

// Load settings from localStorage (client-side only)
function getInitialSettings(): AccessibilitySettings {
  if (typeof window === "undefined") return defaultSettings;

  const savedSettings = localStorage.getItem("accessibility-settings");
  if (savedSettings) {
    try {
      return JSON.parse(savedSettings);
    } catch {
      return defaultSettings;
    }
  }
  return defaultSettings;
}

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showStatement, setShowStatement] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(getInitialSettings);

  // Hydration-safe way to check if mounted on client
  const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);

  // Apply saved settings to DOM on mount
  useEffect(() => {
    applySettings(settings);
  }, [settings]);

  // Update setting and persist (effect handles applying to DOM)
  const updateSetting = (key: keyof AccessibilitySettings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    localStorage.setItem("accessibility-settings", JSON.stringify(newSettings));
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setShowStatement(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) return null;

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.2, ease: [0, 0, 0.2, 1] as const },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: { duration: 0.15, ease: [0.4, 0, 1, 1] as const },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.2 },
    }),
  };

  const toggleItems = [
    {
      key: "largeText" as keyof AccessibilitySettings,
      icon: HiOutlineAdjustmentsHorizontal,
      label: "Increase Text Size",
      description: "Enlarge text for better readability",
    },
    {
      key: "highContrast" as keyof AccessibilitySettings,
      icon: HiOutlineEye,
      label: "High Contrast",
      description: "Enhanced color contrast",
    },
    {
      key: "reduceMotion" as keyof AccessibilitySettings,
      icon: HiOutlinePauseCircle,
      label: "Reduce Motion",
      description: "Disable animations",
    },
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-90 w-20 h-20 rounded-full
          bg-crimson/90 backdrop-blur-xl border border-crimson
          flex items-center justify-center cursor-pointer
          hover:bg-crimson hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-white/50
          transition-all duration-300 shadow-lg shadow-crimson/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Accessibility options"
        aria-expanded={isOpen}
      >
        <IoAccessibility className="text-[2.4rem] text-white" />
      </motion.button>

      {/* Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsOpen(false);
                setShowStatement(false);
              }}
              className="fixed inset-0 z-91 bg-black/40 backdrop-blur-sm"
            />

            {/* Menu */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed bottom-28 right-8 z-92 w-lg max-w-[calc(100vw-4rem)]
                bg-[#0f0f0f]/95 backdrop-blur-2xl rounded-2xl
                border border-crimson/30 shadow-2xl shadow-black/50 overflow-hidden"
              role="dialog"
              aria-label="Accessibility settings"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800/50">
                <div className="flex items-center gap-3">
                  <IoAccessibility className="text-[2rem] text-crimson" />
                  <h2 className="text-[1.6rem] font-semibold text-white tracking-wide">
                    Accessibility
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setShowStatement(false);
                  }}
                  className="w-[3.2rem] h-[3.2rem] rounded-full flex items-center justify-center
                    text-gray-400 hover:text-white hover:bg-gray-800/50
                    transition-colors cursor-pointer"
                  aria-label="Close accessibility menu"
                >
                  <IoMdClose className="text-[2rem]" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                {!showStatement ? (
                  <div className="space-y-2">
                    {toggleItems.map((item, index) => (
                      <motion.button
                        key={item.key}
                        custom={index}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        onClick={() => updateSetting(item.key)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl
                          transition-all duration-200 cursor-pointer group
                          ${
                            settings[item.key]
                              ? "bg-crimson/15 border border-crimson/30"
                              : "bg-gray-800/20 border border-transparent hover:bg-gray-800/40"
                          }`}
                        aria-pressed={settings[item.key]}
                      >
                        <div
                          className={`w-16 h-16 rounded-xl flex items-center justify-center
                          transition-colors ${
                            settings[item.key]
                              ? "bg-crimson/20 text-crimson"
                              : "bg-gray-800/50 text-gray-400 group-hover:text-gray-300"
                          }`}
                        >
                          <item.icon className="text-[2rem]" />
                        </div>
                        <div className="flex-1 text-left">
                          <p
                            className={`text-[1.4rem] font-medium transition-colors ${
                              settings[item.key] ? "text-white" : "text-gray-300"
                            }`}
                          >
                            {item.label}
                          </p>
                          <p className="text-[1.2rem] text-gray-500">{item.description}</p>
                        </div>
                        {/* Toggle Switch */}
                        <div
                          className={`relative w-[4.4rem] h-[2.4rem] rounded-full transition-colors ${
                            settings[item.key] ? "bg-crimson" : "bg-gray-700"
                          }`}
                        >
                          <motion.div
                            className="absolute top-[0.2rem] w-8 h-8 bg-white rounded-full shadow-md"
                            animate={{ left: settings[item.key] ? "2.2rem" : "0.2rem" }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        </div>
                      </motion.button>
                    ))}

                    {/* Accessibility Statement Link */}
                    <motion.button
                      custom={3}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      onClick={() => setShowStatement(true)}
                      className="w-full flex items-center gap-4 p-4 rounded-xl
                        bg-gray-800/20 border border-transparent hover:bg-gray-800/40
                        transition-all duration-200 cursor-pointer group"
                    >
                      <div className="w-16 h-16 rounded-xl bg-gray-800/50 flex items-center justify-center text-gray-400 group-hover:text-gray-300 transition-colors">
                        <HiOutlineDocumentText className="text-[2rem]" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-[1.4rem] font-medium text-gray-300">
                          Accessibility Statement
                        </p>
                        <p className="text-[1.2rem] text-gray-500">View our commitment</p>
                      </div>
                      <span className="text-gray-500 text-[1.8rem]">&rarr;</span>
                    </motion.button>
                  </div>
                ) : (
                  /* Accessibility Statement */
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-2"
                  >
                    <button
                      onClick={() => setShowStatement(false)}
                      className="flex items-center gap-2 text-[1.3rem] text-gray-400 hover:text-crimson
                        transition-colors mb-4 cursor-pointer"
                    >
                      <span>&larr;</span> Back
                    </button>
                    <h3 className="text-[1.6rem] font-semibold text-white mb-4">
                      Accessibility Statement
                    </h3>
                    <div className="space-y-3 text-[1.3rem] text-gray-400 leading-relaxed max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                      <p>
                        We are committed to ensuring digital accessibility for people with
                        disabilities. We continually improve the user experience for everyone and
                        apply the relevant accessibility standards.
                      </p>
                      <p>
                        <strong className="text-gray-300">Conformance Status:</strong> We strive to
                        conform to WCAG 2.1 Level AA guidelines.
                      </p>
                      <p>
                        <strong className="text-gray-300">Accessibility Features:</strong>
                      </p>
                      <ul className="list-disc list-inside space-y-1 pl-2">
                        <li>Semantic HTML structure</li>
                        <li>Keyboard navigation support</li>
                        <li>Text size adjustment options</li>
                        <li>High contrast mode</li>
                        <li>Reduced motion options</li>
                        <li>ARIA labels and landmarks</li>
                      </ul>
                      <p>
                        <strong className="text-gray-300">Feedback:</strong> We welcome your
                        feedback on the accessibility of this site. Please contact us if you
                        encounter any barriers.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
