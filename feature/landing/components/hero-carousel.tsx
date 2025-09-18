"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface HeroSlide {
  id: string;
  badge?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  image: string;
  imageAlt: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: "1",
    badge: "Launching Soon",
    title: "Build exceptional digital experiences",
    description:
      "Our platform helps you create stunning websites and applications with ease, designed to engage your audience and drive results.",
    buttonText: "Get Started",
    buttonHref: "#",
    image: "/images/hero-slide-1.jpg",
    imageAlt: "Team presentation in modern office space",
  },
  {
    id: "2",
    badge: "New Feature",
    title: "Scale your business with confidence",
    description:
      "Advanced tools and analytics to help you grow your digital presence and reach more customers than ever before.",
    buttonText: "Learn More",
    buttonHref: "#",
    image: "/modern-office-collaboration.png",
    imageAlt: "Business team collaborating on digital strategy",
  },
  {
    id: "3",
    badge: "Innovation",
    title: "Transform ideas into reality",
    description:
      "From concept to launch, our comprehensive suite of tools empowers you to bring your vision to life faster than ever.",
    buttonText: "Start Building",
    buttonHref: "#",
    image: "/creative-workspace-with-designers.jpg",
    imageAlt: "Creative team working on digital projects",
  },
];

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  const scrollPrev = () => {
    api?.scrollPrev();
  };

  const scrollNext = () => {
    api?.scrollNext();
  };

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        className="w-full"
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {heroSlides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[600px] md:h-[600px] lg:h-[500px] w-full overflow-hidden">
                {/* Background Image */}
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.imageAlt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="container mx-auto px-4 text-center text-white">
                    {slide.badge && (
                      <div className="mb-4">
                        <span className="inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                          {slide.badge}
                        </span>
                      </div>
                    )}

                    <h1 className="mb-6 text-4xl font-bold leading-tight text-balance md:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>

                    <p className="mb-8 text-lg leading-relaxed text-white/90 text-pretty md:text-xl lg:text-2xl max-w-4xl mx-auto">
                      {slide.description}
                    </p>

                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-white/90 font-semibold px-8 py-3 text-lg"
                      asChild
                    >
                      <a href={slide.buttonHref}>
                        {slide.buttonText}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          className="absolute sm:flex hidden left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
          onClick={scrollPrev}
        >
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Previous slide</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 sm:flex hidden -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
          onClick={scrollNext}
        >
          <ArrowRight className="h-6 w-6" />
          <span className="sr-only">Next slide</span>
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-3 w-3 rounded-full transition-all duration-300",
                current === index + 1
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/70"
              )}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
