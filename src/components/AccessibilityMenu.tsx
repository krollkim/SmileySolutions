"use client";

import { useState, useEffect, useRef, useLayoutEffect, useSyncExternalStore, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { useLocale } from "next-intl";
import { IoAccessibility } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineEye,
  HiOutlinePauseCircle,
  HiOutlineDocumentText,
} from "react-icons/hi2";

const i18n = {
  en: {
    ariaLabel: "Accessibility options",
    closeLabel: "Close accessibility menu",
    heading: "Accessibility",
    dialogLabel: "Accessibility settings",
    toggleItems: [
      { label: "Increase Text Size", description: "Enlarge text for better readability" },
      { label: "High Contrast", description: "Enhanced color contrast" },
      { label: "Reduce Motion", description: "Disable animations" },
    ],
    statementLabel: "Accessibility Statement",
    statementSub: "View our commitment",
    back: "Back",
    statementHeading: "Accessibility Statement",
    statementBody: [
      "We are committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards.",
      "Conformance Status: We strive to conform to WCAG 2.1 Level AA guidelines.",
      "Accessibility Features:",
    ],
    statementList: [
      "Semantic HTML structure",
      "Keyboard navigation support",
      "Text size adjustment options",
      "High contrast mode",
      "Reduced motion options",
      "ARIA labels and landmarks",
    ],
    feedback: "Feedback: We welcome your feedback on the accessibility of this site. Please contact us if you encounter any barriers.",
  },
  he: {
    ariaLabel: "אפשרויות נגישות",
    closeLabel: "סגירת תפריט נגישות",
    heading: "נגישות",
    dialogLabel: "הגדרות נגישות",
    toggleItems: [
      { label: "הגדלת טקסט", description: "הגדל את הטקסט לקריאה נוחה יותר" },
      { label: "ניגודיות גבוהה", description: "ניגודיות צבעים משופרת" },
      { label: "הפחתת תנועה", description: "השבתת אנימציות" },
    ],
    statementLabel: "הצהרת נגישות",
    statementSub: "לצפייה במחויבות שלנו",
    back: "חזרה",
    statementHeading: "הצהרת נגישות",
    statementBody: [
      "אנו מחויבים להבטחת נגישות דיגיטלית לאנשים עם מוגבלויות. אנו משפרים ברציפות את חוויית המשתמש עבור כולם ומיישמים את תקני הנגישות הרלוונטיים.",
      "סטטוס תאימות: אנו שואפים לעמוד בהנחיות WCAG 2.1 רמה AA.",
      "תכונות נגישות:",
    ],
    statementList: [
      "מבנה HTML סמנטי",
      "תמיכה בניווט מקלדת",
      "אפשרויות התאמת גודל טקסט",
      "מצב ניגודיות גבוהה",
      "אפשרויות הפחתת תנועה",
      "תוויות ונקודות עיגון ARIA",
    ],
    feedback: "משוב: אנו מברכים על כל משוב בנוגע לנגישות האתר. אנא צרו קשר אם נתקלתם במכשולים.",
  },
};

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

function applySettings(newSettings: AccessibilitySettings) {
  const root = document.documentElement;

  if (newSettings.largeText) {
    root.classList.add("accessibility-large-text");
  } else {
    root.classList.remove("accessibility-large-text");
  }

  if (newSettings.highContrast) {
    root.classList.add("accessibility-high-contrast");
  } else {
    root.classList.remove("accessibility-high-contrast");
  }

  if (newSettings.reduceMotion) {
    root.classList.add("accessibility-reduce-motion");
  } else {
    root.classList.remove("accessibility-reduce-motion");
  }
}

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

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
  const locale = useLocale();
  const t = i18n[locale as keyof typeof i18n] ?? i18n.en;
  const [isOpen, setIsOpen] = useState(false);
  const [showStatement, setShowStatement] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(getInitialSettings);

  const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);

  // Refs for GSAP animations
  const buttonRef = useRef<HTMLButtonElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLButtonElement[]>([]);
  const toggleKnobsRef = useRef<HTMLDivElement[]>([]);
  const statementRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    applySettings(settings);
  }, [settings]);

  const updateSetting = (key: keyof AccessibilitySettings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    localStorage.setItem("accessibility-settings", JSON.stringify(newSettings));
    
    // Refresh ScrollTrigger after font/layout changes to re-map page coordinates
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

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

  // Button hover/tap animations
  useLayoutEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;

    const handleMouseEnter = () => {
      gsap.to(button, { scale: 1.1, duration: 0.2, ease: "power2.out", force3D: true });
    };

    const handleMouseLeave = () => {
      gsap.to(button, { scale: 1, duration: 0.2, ease: "power2.out", force3D: true });
    };

    const handleMouseDown = () => {
      gsap.to(button, { scale: 0.95, duration: 0.1, ease: "power2.out", force3D: true });
    };

    const handleMouseUp = () => {
      gsap.to(button, { scale: 1.1, duration: 0.1, ease: "power2.out", force3D: true });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);
    button.addEventListener("mousedown", handleMouseDown);
    button.addEventListener("mouseup", handleMouseUp);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      button.removeEventListener("mousedown", handleMouseDown);
      button.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mounted]);

  // Menu open/close animation
  const openMenu = useCallback(() => {
    if (!backdropRef.current || !menuRef.current) return;

    gsap.set(backdropRef.current, { display: "block", visibility: "visible" });
    gsap.set(menuRef.current, { display: "block", visibility: "visible" });

    const tl = gsap.timeline();
    menuTimelineRef.current = tl;

    tl.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.2, ease: "power2.out", force3D: true }
    );

    tl.fromTo(
      menuRef.current,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: "power2.out", force3D: true },
      "-=0.1"
    );

    const validItems = menuItemsRef.current.filter(Boolean);
    if (validItems.length > 0) {
      tl.fromTo(
        validItems,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.2, stagger: 0.05, ease: "power2.out", force3D: true },
        "-=0.1"
      );
    }
  }, []);

  const closeMenu = useCallback(() => {
    if (!backdropRef.current || !menuRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        if (backdropRef.current) {
          gsap.set(backdropRef.current, { display: "none", visibility: "hidden" });
        }
        if (menuRef.current) {
          gsap.set(menuRef.current, { display: "none", visibility: "hidden" });
        }
        setShowStatement(false);
      },
    });

    tl.to(menuRef.current, {
      opacity: 0,
      scale: 0.9,
      y: 20,
      duration: 0.15,
      ease: "power2.in",
      force3D: true,
    });

    tl.to(
      backdropRef.current,
      { opacity: 0, duration: 0.15, ease: "power2.in", force3D: true },
      "-=0.1"
    );
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (isOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  }, [isOpen, mounted, openMenu, closeMenu]);

  // Toggle knob animation
  const animateToggle = (index: number, isActive: boolean) => {
    const knob = toggleKnobsRef.current[index];
    if (!knob) return;

    gsap.to(knob, {
      left: isActive ? "2.2rem" : "0.2rem",
      duration: 0.2,
      ease: "power2.out",
      force3D: true,
    });
  };

  // Statement panel animation
  const showStatementPanel = () => {
    if (!menuContentRef.current) return;

    gsap.to(menuContentRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.15,
      ease: "power2.in",
      force3D: true,
      onComplete: () => {
        setShowStatement(true);
      },
    });
  };

  const hideStatementPanel = () => {
    if (!statementRef.current) return;

    gsap.to(statementRef.current, {
      opacity: 0,
      x: 20,
      duration: 0.15,
      ease: "power2.in",
      force3D: true,
      onComplete: () => {
        setShowStatement(false);
      },
    });
  };

  useLayoutEffect(() => {
    if (!mounted) return;

    if (showStatement && statementRef.current) {
      gsap.fromTo(
        statementRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.2, ease: "power2.out", force3D: true }
      );
    } else if (!showStatement && menuContentRef.current && isOpen) {
      gsap.fromTo(
        menuContentRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.2, ease: "power2.out", force3D: true }
      );
      const validItems = menuItemsRef.current.filter(Boolean);
      if (validItems.length > 0) {
        gsap.fromTo(
          validItems,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.2, stagger: 0.05, ease: "power2.out", force3D: true }
        );
      }
    }
  }, [showStatement, mounted, isOpen]);

  if (!mounted) return null;

  const toggleItems = [
    {
      key: "largeText" as keyof AccessibilitySettings,
      icon: HiOutlineAdjustmentsHorizontal,
      ...t.toggleItems[0],
    },
    {
      key: "highContrast" as keyof AccessibilitySettings,
      icon: HiOutlineEye,
      ...t.toggleItems[1],
    },
    {
      key: "reduceMotion" as keyof AccessibilitySettings,
      icon: HiOutlinePauseCircle,
      ...t.toggleItems[2],
    },
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-14 right-8 z-90 w-20 h-20 rounded-full
          bg-crimson/90 backdrop-blur-xl border border-crimson
          flex items-center justify-center cursor-pointer
          hover:bg-crimson
          focus:outline-none focus:ring-2 focus:ring-white/50
          transition-colors duration-300 shadow-lg shadow-crimson/30"
        style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        aria-label={t.ariaLabel}
        aria-expanded={isOpen}
      >
        <IoAccessibility className="text-[2.4rem] text-white" />
      </button>

      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 z-91 bg-black/40 backdrop-blur-sm"
        style={{ display: "none", visibility: "hidden", opacity: 0 }}
      />

      {/* Menu Panel */}
      <div
        ref={menuRef}
        className="fixed bottom-28 right-8 z-92 w-lg max-w-[calc(100vw-4rem)]
          bg-[#0f0f0f]/95 backdrop-blur-2xl rounded-2xl
          border border-crimson/30 shadow-2xl shadow-black/50 overflow-hidden"
        style={{
          display: "none",
          visibility: "hidden",
          opacity: 0,
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
        role="dialog"
        aria-label={t.dialogLabel}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800/50">
          <div className="flex items-center gap-3">
            <IoAccessibility className="text-[2rem] text-crimson" />
            <h2 className="text-[1.6rem] font-semibold text-white tracking-wide">
              {t.heading}
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-[3.2rem] h-[3.2rem] rounded-full flex items-center justify-center
              text-gray-400 hover:text-white hover:bg-gray-800/50
              transition-colors cursor-pointer"
            aria-label={t.closeLabel}
          >
            <IoMdClose className="text-[2rem]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {!showStatement ? (
            <div ref={menuContentRef} className="space-y-2">
              {toggleItems.map((item, index) => (
                <button
                  key={item.key}
                  ref={(el) => { if (el) menuItemsRef.current[index] = el; }}
                  onClick={() => {
                    updateSetting(item.key);
                    animateToggle(index, !settings[item.key]);
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl
                    transition-all duration-200 cursor-pointer group
                    ${
                      settings[item.key]
                        ? "bg-crimson/15 border border-crimson/30"
                        : "bg-gray-800/20 border border-transparent hover:bg-gray-800/40"
                    }`}
                  style={{ opacity: 0, transform: "translateX(-10px) translateZ(0)" }}
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
                    <div
                      ref={(el) => { if (el) toggleKnobsRef.current[index] = el; }}
                      className="absolute top-[0.2rem] w-8 h-8 bg-white rounded-full shadow-md"
                      style={{ left: settings[item.key] ? "2.2rem" : "0.2rem" }}
                    />
                  </div>
                </button>
              ))}

              {/* Accessibility Statement Link */}
              <button
                ref={(el) => { if (el) menuItemsRef.current[3] = el; }}
                onClick={showStatementPanel}
                className="w-full flex items-center gap-4 p-4 rounded-xl
                  bg-gray-800/20 border border-transparent hover:bg-gray-800/40
                  transition-all duration-200 cursor-pointer group"
                style={{ opacity: 0, transform: "translateX(-10px) translateZ(0)" }}
              >
                <div className="w-16 h-16 rounded-xl bg-gray-800/50 flex items-center justify-center text-gray-400 group-hover:text-gray-300 transition-colors">
                  <HiOutlineDocumentText className="text-[2rem]" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[1.4rem] font-medium text-gray-300">
                    {t.statementLabel}
                  </p>
                  <p className="text-[1.2rem] text-gray-500">{t.statementSub}</p>
                </div>
                <span className="text-gray-500 text-[1.8rem]">&rarr;</span>
              </button>
            </div>
          ) : (
            /* Accessibility Statement */
            <div ref={statementRef} className="p-2" style={{ opacity: 0, transform: "translateX(20px) translateZ(0)" }}>
              <button
                onClick={hideStatementPanel}
                className="flex items-center gap-2 text-[1.3rem] text-gray-400 hover:text-crimson
                  transition-colors mb-4 cursor-pointer"
              >
                <span>&larr;</span> {t.back}
              </button>
              <h3 className="text-[1.6rem] font-semibold text-white mb-4">
                {t.statementHeading}
              </h3>
              <div className="space-y-3 text-[1.3rem] text-gray-400 leading-relaxed max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                <p>{t.statementBody[0]}</p>
                <p>
                  <strong className="text-gray-300">{t.statementBody[1].split(':')[0]}:</strong>{' '}
                  {t.statementBody[1].split(':').slice(1).join(':').trim()}
                </p>
                <p>
                  <strong className="text-gray-300">{t.statementBody[2]}</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  {t.statementList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p>{t.feedback}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
