"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { sendEmailViaBrevoTemplate } from "@/lib/brevo";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("/api/sessions/revalidate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "", // Secure your API key
        },
      });

      const result = await response.json();

      if (!response) {
        throw new Error(result.error || "Something went wrong");
      }

      setMessage(result.message);
    } catch (err: any) {
      setError(err.message || "Failed to revalidate sessions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 flex flex-col items-center">
      <div>
        <Button onClick={handleClick} className="min-w-[180px]">
          {!loading ? "Complete Session" : "loading"}
        </Button>
      </div>
      {message && <p className="mt-4 text-green-500">{message}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
