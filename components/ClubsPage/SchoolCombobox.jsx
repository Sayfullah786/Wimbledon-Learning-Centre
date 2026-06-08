import React, { useState } from "react";
import { Search, ChevronDown, Check, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export const SchoolCombobox = ({ schools, selected, onSelect, loading }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className={`w-full max-w-lg mx-auto flex items-center gap-3 bg-white/10 backdrop-blur-md border rounded-2xl px-5 py-4 cursor-pointer transition-all duration-300 ${open
              ? "border-main/60 shadow-[0_0_30px_rgba(34,158,189,0.15)]"
              : "border-white/20 hover:border-white/40"
            }`}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 text-white/50 flex-shrink-0 animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-white/50 flex-shrink-0" />
          )}
          <span className={`flex-1 text-left text-sm sm:text-base ${selected ? "text-white" : "text-white/40"}`}>
            {loading ? "Loading schools..." : selected || "Search or select a school..."}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-white/50 transition-transform duration-300 ${open ? "rotate-180" : ""
              }`}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0 rounded-2xl border-gray-100 shadow-2xl"
        align="center"
        sideOffset={8}
      >
        <Command className="rounded-2xl">
          <CommandInput placeholder="Type to search schools..." className="text-sm" />
          <CommandList>
            <CommandEmpty>No school found.</CommandEmpty>
            <CommandGroup>
              {schools.map((school) => (
                <CommandItem
                  key={school.id || school.slug}
                  value={school.name}
                  onSelect={() => {
                    onSelect(school);
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 py-3 px-4 cursor-pointer text-sm"
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${selected === school.name
                        ? "border-main bg-main"
                        : "border-gray-300"
                      }`}
                  >
                    {selected === school.name && (
                      <Check className="w-2.5 h-2.5 text-white" />
                    )}
                  </div>
                  <span className={selected === school.name ? "font-medium text-main" : ""}>
                    {school.name}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
