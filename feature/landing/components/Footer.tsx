"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUp, Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Integrations"],
    },
    {
      title: "Company",
      links: ["About", "Blog", "Careers"],
    },
    {
      title: "Resources",
      links: ["Documentation", "Support", "Contact"],
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Cookies"],
    },
  ];

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "GitHub", icon: Github, href: "#" },
  ];

  return (
    <footer className="bg-background w-full ">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-4">Your Company</h2>
            <p className="dark:text-muted-foreground text-neutral-700 mb-6 max-w-md">
              Simplifying complexity, one interface at a time.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map(({ name, icon: Icon, href }) => (
                <Link key={name} href={href}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{name}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {footerLinks.map(({ title, links }) => (
              <div key={title}>
                <h3 className="text-lg font-semibold mb-4">{title}</h3>
                <ul className="space-y-3 ">
                  {links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="dark:text-muted-foreground text-neutral-700 text-sm hover:text-foreground"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="dark:text-muted-foreground text-neutral-700 text-sm mb-4 sm:mb-0 text-center sm:text-left">
            © 2025 Your Company. All rights reserved.
          </p>

          <Button
            variant="ghost"
            onClick={scrollToTop}
            className="dark:text-muted-foreground text-neutral-700 text-sm flex items-center"
          >
            Back to top
            <ArrowUp className="ml-2 h-4 w-4 " />
          </Button>
        </div>
      </div>
    </footer>
  );
}
