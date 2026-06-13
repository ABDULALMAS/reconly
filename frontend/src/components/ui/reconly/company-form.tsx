"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { Input } from "@/src/components/ui/input";
import { ShimmerButton } from "@/src/components/ui/shimmer-button";

interface CompanyFormProps {
  onAnalyze: (url: string) => void;
  isLoading?: boolean;
}

export function CompanyForm({ onAnalyze, isLoading = false }: CompanyFormProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const normalizeUrl = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
      return `https://${trimmed}`;
    }
    return trimmed;
  };

  const isValidWebsite = (value: string) => {
    try {
      const u = new URL(value);
      return /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(u.hostname);
    } catch {
      return false;
    }
  };

  const handleSubmit = () => {
    setError("");
    if (!url.trim()) {
      setError("Enter a company website URL.");
      return;
    }
    const normalizedUrl = normalizeUrl(url);
    if (!isValidWebsite(normalizedUrl)) {
      setError("That doesn't look like a valid URL.");
      return;
    }
    onAnalyze(normalizedUrl);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) handleSubmit();
  };

  return (
    <div className="mt-10 w-full max-w-2xl mx-auto">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="url"
          value={url}
          disabled={isLoading}
          placeholder="linear.app"
          autoComplete="off"
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setUrl(e.target.value);
            if (error) setError("");
          }}
          className="h-14 flex-1 border-zinc-800 bg-zinc-950/80 text-base placeholder:text-zinc-600 focus-visible:border-zinc-600 focus-visible:ring-0"
        />

        <ShimmerButton
          disabled={isLoading}
          className="h-14 px-8 text-sm font-semibold"
          onClick={handleSubmit}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
              />
              Analyzing…
            </span>
          ) : (
            "Analyze Company"
          )}
        </ShimmerButton>
      </div>

      <AnimatePresenceWrapper>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-sm text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresenceWrapper>

      <p className="mt-3 text-sm text-zinc-600">
        Enter a company, startup, or product website.
      </p>
    </div>
  );
}

function AnimatePresenceWrapper({ children }: { children: React.ReactNode }) {
  const { AnimatePresence } = require("motion/react");
  return <AnimatePresence>{children}</AnimatePresence>;
}