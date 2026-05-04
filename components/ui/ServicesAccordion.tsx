"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { ChevronDown } from "lucide-react";

export interface AccordionService {
  id: string;
  icon: string;
  title: string;
  description: string;
  benefits: string[];
}

interface ServicesAccordionProps {
  services: AccordionService[];
  accentColor: string;
  accentColorRgb: string;
  gradient: string;
  minHeight?: number;
}

export default function ServicesAccordion({
  services,
  accentColor,
  accentColorRgb,
  minHeight,
}: ServicesAccordionProps) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div
      className="flex flex-col"
      style={{
        border: `1px solid rgba(${accentColorRgb}, 0.15)`,
        borderRadius: 16,
        overflow: "hidden",
        minHeight: minHeight ? `${minHeight}px` : undefined,
        boxShadow: `0 0 0 1px rgba(${accentColorRgb}, 0.05), inset 0 1px 0 rgba(255,255,255,0.04)`,
      }}
    >
      {services.map((service, index) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const IconComp = (Icons as any)[service.icon] as
          | React.ElementType
          | undefined;
        const isOpen = open === service.id;

        return (
          <div key={service.id}>
            {/* Row trigger */}
            <button
              onClick={() => setOpen(isOpen ? null : service.id)}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all duration-200 cursor-pointer group"
              style={{
                background: isOpen
                  ? `rgba(${accentColorRgb}, 0.07)`
                  : "transparent",
              }}
            >
              {/* Icon */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={{
                  background: isOpen
                    ? `rgba(${accentColorRgb}, 0.20)`
                    : `rgba(${accentColorRgb}, 0.10)`,
                }}
              >
                {IconComp && (
                  <IconComp
                    size={15}
                    style={{ color: accentColor, opacity: isOpen ? 1 : 0.7 }}
                  />
                )}
              </div>

              {/* Title */}
              <span
                className="flex-1 font-semibold text-[16px] leading-tight transition-colors duration-200"
                style={{ color: isOpen ? "#fff" : "rgba(255,255,255,0.75)" }}
              >
                {service.title}
              </span>

              {/* Chevron */}
              <ChevronDown
                size={16}
                className="flex-shrink-0 transition-transform duration-300"
                style={{
                  color: accentColor,
                  opacity: 0.6,
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>

            {/* Expanded content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="p-5 flex flex-col gap-4">
                    {/* Left accent bar + description */}
                    <div
                      className="pl-4 text-base leading-relaxed"
                      style={{
                        borderLeft: `2px solid rgba(${accentColorRgb}, 0.4)`,
                        color: "rgba(255,255,255,0.60)",
                      }}
                    >
                      {service.description}
                    </div>

                    {/* Benefit pills */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {service.benefits.map((b) => (
                        <span
                          key={b}
                          className="text-[11px] font-medium px-3 py-1 rounded-full"
                          style={{
                            background: `rgba(${accentColorRgb}, 0.10)`,
                            color: accentColor,
                            border: `1px solid rgba(${accentColorRgb}, 0.20)`,
                          }}
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Divider */}
            {index < services.length - 1 && (
              <div
                style={{
                  height: 1,
                  background: `rgba(${accentColorRgb}, 0.12)`,
                  margin: "0 16px",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
