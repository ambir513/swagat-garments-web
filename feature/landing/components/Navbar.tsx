"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CommandDialogDemo } from "./Search";
import ThemeBtn from "@/components/ui/theme-switcher";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false); // control dialog from Navbar

  return (
    <header className="bg-background w-full border-b-2 dark:border-gray-600 border-gray-300 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-3 flex justify-between">
        <h1 className="text-2xl">Logo</h1>
        <div className="sm:flex hidden justify-center items-center gap-x-3">
          <div className="relative">
            <Input
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={() => setOpen(true)} // 👈 open dialog when clicked
              className="w-sm cursor-pointer"
              readOnly // prevent typing directly here, input just triggers dialog
            />
            <div className="flex items-center text-sm text-muted-foreground absolute right-2 top-1.5">
              ⌘ + j
            </div>
          </div>
          <ThemeBtn />
        </div>
      </div>

      {/* Pass state + setter */}
      <CommandDialogDemo
        search={search}
        setSearch={setSearch}
        open={open}
        setOpen={setOpen}
      />
    </header>
  );
}
