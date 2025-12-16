/* eslint-disable react/no-unescaped-entities */
"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

export function Hero() {
  const containerHero = useRef<HTMLElement>(null);
  const videoHero = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      // if (videoHero.current) {
      //   videoHero.current.pause(); // Pausa no início

      //   gsap.delayedCall(4, () => {
      //     videoHero.current?.play();
      //   });
      // }
      const tl = gsap.timeline({
        delay: 5,
      });

      tl.fromTo(
        "#p1",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1.5,
          ease: "Expo.easeInOut",
          onComplete: () => {
            gsap.to("#p1", {
              opacity: 0,
              // display: "none",
            });
          },
        }
      )
        .fromTo(
          "#p2",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1.5,
            ease: "Expo.easeInOut",
            onComplete: () => {
              gsap.to("#p2", {
                opacity: 0,
                // display: "none",
              });
            },
          }
        )
        .fromTo(
          "#p3",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1.5,
            ease: "Expo.easeInOut",
            onComplete: () => {
              gsap.to("#p3", {
                opacity: 0,
                // display: "none",
              });
            },
          }
        )
        .to(videoHero.current, {
          opacity: 1,
          ease: "Expo.easeInOut",
          onStart: () => {
            videoHero.current?.play();
            // Escuta quando o vídeo termina
            videoHero.current?.addEventListener("ended", () => {
              console.log("Vídeo terminou!");
              gsap.to("#p1, #p2, #p3", {
                // opacity: 0,
                display: "none",
                // stagger: 0.5,
              });
              gsap.to(".h1-main", {
                opacity: 1,
                delay: 0.5,
              });
            });
          },
        });
    },
    { scope: containerHero }
  );

  return (
    <section ref={containerHero} className="min-h-svh bg-[#000000]">
      <div className="flex items-center justify-center relative h-screen">
        <div className="md:w-6/12 w-full">
          <video
            ref={videoHero}
            // src="./mv-hero-edited-glitch.mp4"
            src="./mv-hero-edited-2.mp4"
            muted
            className="hero-video h-full opacity-0 "
          ></video>
        </div>

        <div className="md:w-7/12 2xl:-ml-40 lg:-ml-20 w-full px-4 md:max-w-6xl text-center font-black text-2xl md:text-5xl flex flex-col gap-4 md:relative md:bottom-0 absolute bottom-80">
          <div className="h1-main opacity-0 flex flex-col md:items-start justify-center">
            <h1 className="2xl:text-8xl md:text-6xl text-4xl leading-12">
              Max Verstappen
            </h1>
            <span className="md:text-left text-2xl font-oswald">
              4x world champion
            </span>
          </div>

          <p
            id="p1"
            className="opacity-0 bg-linear-to-r from-indigo-900 via-red-500 to-amber-400 bg-clip-text text-transparent"
          >
            I'M MAX VERSTAPPEN.
          </p>
          <p
            id="p2"
            className="opacity-0  bg-linear-to-r from-indigo-900 via-red-500 to-amber-400 bg-clip-text text-transparent"
          >
            I'M THE BEST DRIVER.
          </p>
          <p
            id="p3"
            className="opacity-0  bg-linear-to-r from-indigo-900 via-red-500 to-amber-400 bg-clip-text text-transparent"
          >
            BECAUSE I BELIEVE I'M THE BEST.
          </p>
        </div>
      </div>
    </section>
  );
}
