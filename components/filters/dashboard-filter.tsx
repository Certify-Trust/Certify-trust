"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

const collections = ["All Collections", "2024 Collections", "2025 Collections"];

const appearances = ["All Appearances", "Dark", "Light", "System"];

export default function FilterBar() {
  const [search, setSearch] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("Collections");
  const [selectedAppearance, setSelectedAppearance] = useState("Appearance");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const hasActiveFilters =
    selectedCollection !== "Collections" || selectedAppearance !== "Appearance";

  const resetFilters = () => {
    setSelectedCollection("Collections");
    setSelectedAppearance("Appearance");
  };

  const dropdownButtonClass = `
      h-9 px-4 rounded-lg border border-gray-300 bg-white
      text-sm font-normal text-gray-900
      hover:bg-gray-50 hover:text-gray-800
      shadow-none
      focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-gray-300
      gap-2 w-full justify-between sm:w-auto
      transition-all duration-200
    `;

  return (
    <div className="border-b border-gray-200 pb-6">
      <div className="max-w-162.25 bg-white">
        {/* MAIN ROW */}
        <div className="flex items-center gap-3">
          {/* SEARCH */}
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <Input
              type="text"
              placeholder="Search for design name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-lg border border-gray-300 bg-white pl-9 text-sm text-gray-700 shadow-none placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-300"
            />
          </div>

          {/* DESKTOP FILTERS */}
          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <CollectionDropdown
              selected={selectedCollection}
              onSelect={setSelectedCollection}
              buttonClass={dropdownButtonClass}
            />

            <AppearanceDropdown
              selected={selectedAppearance}
              onSelect={setSelectedAppearance}
              buttonClass={dropdownButtonClass}
            />

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-gray-400 transition hover:text-gray-600"
              >
                Reset
              </button>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <motion.button
            onClick={() => setFiltersOpen((v) => !v)}
            aria-label="Toggle filters"
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.03 }}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 sm:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {filtersOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>

            {hasActiveFilters && !filtersOpen && (
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-blue-500" />
            )}
          </motion.button>
        </div>

        {/* MOBILE PANEL */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-3 flex flex-col gap-2 sm:hidden"
            >
              <CollectionDropdown
                selected={selectedCollection}
                onSelect={setSelectedCollection}
                buttonClass={dropdownButtonClass}
              />

              <AppearanceDropdown
                selected={selectedAppearance}
                onSelect={setSelectedAppearance}
                buttonClass={dropdownButtonClass}
              />

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-left text-xs text-gray-400 hover:text-gray-600"
                >
                  Reset filters
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* DROPDOWNS */

function CollectionDropdown({
  selected,
  onSelect,
  buttonClass,
}: {
  selected: string;
  onSelect: (v: string) => void;
  buttonClass: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={buttonClass} variant="outline">
          {selected}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-45">
        {collections.map((item) => (
          <DropdownMenuItem
            key={item}
            onSelect={() => onSelect(item)}
            className="cursor-pointer bg-white text-sm"
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AppearanceDropdown({
  selected,
  onSelect,
  buttonClass,
}: {
  selected: string;
  onSelect: (v: string) => void;
  buttonClass: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={buttonClass} variant="outline">
          {selected}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-45">
        {appearances.map((item) => (
          <DropdownMenuItem
            key={item}
            onSelect={() => onSelect(item)}
            className="cursor-pointer bg-white text-sm"
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
