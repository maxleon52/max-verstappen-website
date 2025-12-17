/* eslint-disable @next/next/no-img-element */
"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function BornForThis() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".wrapper-images",
          start: "top center",
          end: "bottom center",
          markers: true,
        },
      });
      const wrapperImages = gsap.utils.toArray(
        ".wrapper-image",
        containerRef.current
      );
      const images = gsap.utils.toArray(
        ".wrapper-image img",
        containerRef.current
      );

      // Anima todos os wrappers primeiro com impacto
      wrapperImages.forEach((wrapper) => {
        tl.fromTo(
          wrapper as Element,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          }
        );
      });

      // Depois anima todas as imagens com bounce
      images.forEach((image) => {
        tl.fromTo(
          image as Element,
          {
            opacity: 0,
            scale: 1.2,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.1,
            ease: "sine.out",
          }
        );
      });
    },
    { scope: containerRef }
  );
  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="wrapper-images divide-x-2  w-full flex justify-center">
        <div className="wrapper-image opacity-0 flex items-center justify-center overflow-hidden w-75 transition-all duration-700 ">
          <img
            src={`./images/img-1-without-bg.png`}
            alt="Born For This"
            className="img-into-divider opacity-0 w-full object-cover hover:filter-(--filter-border)"
          />
        </div>
        <div className="wrapper-image opacity-0 flex items-center justify-center overflow-hidden w-75">
          <img
            src={`./images/img-2-without-bg.png`}
            alt="Born For This"
            className="img-into-divider opacity-0 w-full object-cover hover:filter-(--filter-border)"
          />
        </div>
        <div className="wrapper-image opacity-0 flex items-center justify-center overflow-hidden w-75">
          <img
            src={`./images/img-3-without-bg.png`}
            alt="Born For This"
            className="img-into-divider opacity-0 w-full object-cover hover:filter-(--filter-border)"
          />
        </div>
        <div className="wrapper-image opacity-0 flex items-center justify-center flex-none  overflow-hidden w-75 ">
          <img
            src={`./images/img-4-without-bg.png`}
            alt="Born For This"
            className="img-into-divider opacity-0 w-full object-cover hover:filter-(--filter-border)"
          />
        </div>
        <div className="wrapper-image opacity-0 flex items-center justify-center overflow-hidden w-75">
          <img
            src={`./images/img-5-without-bg.png`}
            alt="Born For This"
            className="img-into-divider opacity-0 w-full h-full object-cover hover:filter-(--filter-border)"
          />
        </div>
      </div>
    </section>
  );
}
