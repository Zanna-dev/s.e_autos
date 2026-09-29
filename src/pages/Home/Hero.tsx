import { useEffect, useState } from "react";
import type { Vehicle } from "../../interfaces/vehicle";
import { Icon } from "../../components/common/Icon";
import { VehiclePhoto } from "../../components/common/VehiclePhoto";
import { useContact } from "../../context/ContactContext";

export function Hero({ vehicles }: { vehicles: Vehicle[] }) {
  const [selected, setSelected] = useState(0);
  const [angle, setAngle] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );


  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);


  useEffect(() => {
    if (paused || reduced || vehicles.length < 2) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setSelected((current) => (current + 1) % vehicles.length);
      setAngle(0);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [paused, reduced, vehicles.length]);
  const contact = useContact();
  const vehicle = vehicles[selected % vehicles.length];
  const photoAngle = Math.min(angle, (vehicle?.images.length ?? 1) - 1);
  if (!vehicle) return null;
  return (
    <section className="hero" id="experience" aria-labelledby="hero-heading">
      <div className="hero-visual" aria-hidden="true">
        {vehicles.map((item, index) => (
          <div
            key={item.id}
            className={`hero-slide ${index === selected ? "is-active" : ""}`}
          >
            <VehiclePhoto
              image={item.images[index === selected ? photoAngle : 0]}
              priority={index === 0}
              className="hero-photo"
            />
          </div>
        ))}
      </div>
      <div className="hero-shade" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content">
        <p className="eyebrow">
          <span className="live-dot" /> DOUBLE S.E AUTOS · ABUJA
        </p>
        <h1 id="hero-heading">
          A different
          <br />
          class of <em>drive.</em>
        </h1>
        <p className="hero-description">
          For the road ahead. And the person you’re becoming.
          <br />
          Exceptional choices. Honest conversations.
        </p>
        <div className="hero-ctas">
          <a className="button primary" href="#collection">
            Explore the collection <Icon name="diagonal" />
          </a>
          <button className="hero-secondary" onClick={() => contact()}>
            Find my next car <Icon name="arrow" />
          </button>
        </div>
        <div className="hero-proof">
          <span className="mini-cross">+</span>
          <p>
            Nigerian-used. Foreign-used. Your next move.
            <br />
            <span>Discover a more personal way to buy.</span>
          </p>
        </div>
      </div>
      <div className="hero-side-label" aria-hidden="true">
        CURATED AUTOMOTIVE EXPERIENCES / ABUJA
      </div>
      <div className="hero-console">
        <div className="console-heading">
          <span className="eyebrow">
            <span className="live-dot" /> THE DIGITAL SHOWROOM
          </span>
          <span>ILLUSTRATIVE VISUALS</span>
        </div>
        <div className="console-main">
          <div
            className="vehicle-selector"
            role="group"
            aria-label="Choose featured vehicle"
          >
            {vehicles.map((item, index) => (
              <button
                key={item.id}
                aria-pressed={selected === index}
                onClick={() => {
                  setPaused(true);
                  setSelected(index);
                  setAngle(0);
                }}
              >
                <span>0{index + 1}</span>
                {item.make}
              </button>
            ))}
          </div>
          <div
            className="hero-angle-selector"
            role="group"
            aria-label="Choose photo angle"
          >
            {vehicle.images.map((photo, index) => (
              <button
                key={photo.src}
                aria-pressed={angle === index}
                onClick={() => {
                  setPaused(true);
                  setAngle(index);
                }}
              >
                {photo.label}
              </button>
            ))}
          </div>
        </div>
        <div className="console-bottom">
          <span>
            {vehicle.name} <span className="console-dot">/</span>{" "}
            {vehicle.images[photoAngle].label}
          </span>
          <button
            className="slideshow-control"
            onClick={() => setPaused(!paused)}
            disabled={reduced}
            aria-label={
              reduced
                ? "Slideshow paused for reduced motion"
                : paused
                  ? "Play slideshow"
                  : "Pause slideshow"
            }
          >
            {reduced
              ? "Reduced motion · paused"
              : paused
                ? "Play slideshow ▷"
                : "Pause slideshow Ⅱ"}
          </button>
        </div>
      </div>
    </section>
  );
}
