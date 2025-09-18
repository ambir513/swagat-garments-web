"use client";
import Image from "next/image";
import ThemeBtn from "@/components/ui/theme-switcher";
import Footer from "@/feature/landing/components/Footer";
import CarouselWithPagination from "@/feature/landing/components/carousel-pagination";
import Navbar from "@/feature/landing/components/Navbar";
import { HeroCarousel } from "@/feature/landing/components/hero-carousel";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroCarousel />

        {/* Additional content can go here */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Welcome to Our Platform</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover more about our services and how we can help you build
              exceptional digital experiences.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
