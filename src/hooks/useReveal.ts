import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement>() {
  // useRef is a mutable hook, so we need to use it in a useEffect
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (
      !element ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    element.classList.add("reveal-ready");
    observer.observe(element);
    return () => {
      observer.disconnect();
      element.classList.remove("reveal-ready");
    };
  }, []);
  return ref;
}
