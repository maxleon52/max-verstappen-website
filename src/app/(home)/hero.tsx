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

      //   gsap.delayedCall(0, () => {
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
          // opacity: 1,
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
              gsap.to(".wrapper-mv-name, .wrapper-victorious", {
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
    <section ref={containerHero} className="min-h-svh">
      <div className="flex items-center justify-center relative h-screen">
        <div className="bg-video-hero -z-1 absolute flex items-center justify-center w-full h-full">
          <video
            ref={videoHero}
            // src="./mv-hero-edited-glitch.mp4"
            src="./video-hero-edited-with-transition.mp4"
            muted
            className="h-full w-full object-cover"
            // className="h-full object-cover translate-x-112.5"
          ></video>
        </div>

        <div className="flex flex-col md:items-start justify-center xl:mt-40">
          <div className="wrapper-mv-name opacity-0 flex gap-4 xl:gap-8 xl:text-8xl md:text-6xl text-4xl leading-6 xl:leading-12">
            <span>Max</span>
            <span>Verstappen</span>
          </div>
          <span className="wrapper-victorious opacity-0 md:text-left xl:text-2xl font-oswald">
            4x world champion
          </span>

          <div className="xl:text-7xl text-center text-4xl px-4">
            <p
              id="p1"
              className="opacity-0 border bg-linear-to-r from-indigo-900 via-red-500 to-amber-400 bg-clip-text text-transparent"
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
      </div>
    </section>
  );
}
