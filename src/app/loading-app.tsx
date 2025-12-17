"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef, useState } from "react";

export function LoadingApp() {
  const [isVisible, setIsVisible] = useState(true);
  const containerLoadApp = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      let isDOMReady = false;
      let animationTl: gsap.core.Timeline | null = null;

      const tl = gsap.timeline({
        paused: true,
        onComplete: () => {
          gsap.to("#mv-logo", {
            duration: 0.5,
            opacity: 0,
            ease: "Expo.easeInOut",
            onComplete: () => {
              document.body.style.overflow = "";
              gsap.to(containerLoadApp.current, {
                width: "0%",
                duration: 0.5,
                ease: "Expo.easeInOut",
                onComplete: () => {
                  document.body.style.overflow = "";
                  setIsVisible(false); // Remove o componente do DOM
                },
              });
            },
          });
          // gsap.to(containerLoadApp.current, {
          //   width: "0%",
          //   duration: 1,
          //   ease: "Expo.easeInOut",
          //   onComplete: () => {
          //     document.body.style.overflow = "";
          //   },
          // });
        },
      });

      const createAnimationCycle = () => {
        const cycleTl = gsap.timeline({
          onComplete: () => {
            // Se DOMContentLoaded ainda não disparou, repete
            if (!isDOMReady) {
              createAnimationCycle();
            } else {
              // DOMContentLoaded disparou, finaliza a animação e inicia o fade do container
              tl.play();
            }
          },
        });

        // Animar o stroke primeiro
        cycleTl.fromTo(
          "#mv-logo path",
          {
            stroke: "white",
            strokeDasharray: "1 300",
            fill: "transparent",
          },
          {
            stroke: "white",
            strokeDasharray: "300 1",
            duration: 2,
          }
        );

        // Depois animar o fill
        cycleTl.to("#mv-logo path", {
          fill: "white",
          duration: 1,
        });

        // Delay antes de próximo ciclo (se houver)
        cycleTl.to({}, { duration: 0.5 });

        animationTl = cycleTl;
      };

      // Listener para DOMContentLoaded
      const handleDOMReady = () => {
        isDOMReady = true;
      };

      // Inicia a animação
      createAnimationCycle();

      if (
        // verifica se o DOM já está pronto
        document.readyState === "complete" ||
        document.readyState === "interactive"
      ) {
        isDOMReady = true;
      } else {
        document.addEventListener("DOMContentLoaded", handleDOMReady);
      }

      // Cleanup
      return () => {
        animationTl?.kill();
        tl.kill();
        document.removeEventListener("DOMContentLoaded", handleDOMReady);
      };
    },
    {
      scope: containerLoadApp,
    }
  );
  return isVisible ? (
    <div
      ref={containerLoadApp}
      className="w-full h-screen z-10 fixed top-0 left-0 bg-max-blue-900 flex items-center justify-center"
    >
      <svg
        width="137"
        height="136"
        viewBox="0 0 674 336"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="mv-logo">
          <path
            id="mv-logo-right"
            d="M561.703 156.65L673.914 268.775H449.493L561.703 156.65Z"
            fill="transparent"
          />
          <path
            id="mv-logo-left"
            d="M112.21 156.65L224.747 268.775H0L112.21 156.65Z"
            fill="transparent"
          />
          <path
            id="mv-logo-top"
            d="M336.957 335.725L0 0L213.33 33.475L336.957 156.65L460.584 33.475L673.914 0L336.957 335.725Z"
            fill="transparent"
          />
        </g>
      </svg>
    </div>
  ) : null;
}
