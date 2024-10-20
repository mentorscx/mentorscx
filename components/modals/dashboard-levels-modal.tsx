"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import Link from "next/link";

// Reusable Ranks Table Component
function RanksTable({
  ranks,
}: {
  ranks: Array<{ name: string; emoji: string; reviews: string }>;
}) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border-b-2 border-blue-200 px-4 py-2 text-left text-blue-600">
            Rank
          </th>
          <th className="border-b-2 border-blue-200 px-4 py-2 text-left text-blue-600">
            Reviews
          </th>
        </tr>
      </thead>
      <tbody>
        {ranks.map((rank, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}
          >
            <td className="border-b border-blue-100 px-4 py-2">
              <div className="flex items-center">
                <span
                  className="mr-1 text-2xl"
                  role="img"
                  aria-label={`${rank.name} icon`}
                >
                  {rank.emoji}
                </span>
                {rank.name}
              </div>
            </td>
            <td className="border-b border-blue-100 px-4 py-2">
              {rank.reviews}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Reusable Levels Dialog Component
function LevelsDialog({
  dialogTitle,
  ranks,
}: {
  dialogTitle: string;
  ranks: Array<{ name: string; emoji: string; reviews: string }>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <InfoIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600">
            {dialogTitle}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <RanksTable ranks={ranks} />
          <p className="mt-4">
            Every level unlocks a special surprise, giving you a new reward that
            makes your journey more exciting.
          </p>
          <Button variant="link" asChild size="lg" className="px-0">
            <Link href="/">Learn more</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Mentee Levels Dialog Component
export function MenteeLevelsDialog() {
  const menteeRanks = [
    { name: "Hunab Learner", emoji: "🌞", reviews: "0 - 7" },
    { name: "Chaak Seeker", emoji: "🌀", reviews: "8 - 21" },
    { name: "Balam Explorer", emoji: "🐆", reviews: "22 - 44" },
    { name: "Itzamna Scholar", emoji: "🦅", reviews: "45 - 79" },
    { name: "K'inich Ahau Achiever", emoji: "☀️", reviews: "80+" },
  ];

  return <LevelsDialog dialogTitle="Mentee Levels" ranks={menteeRanks} />;
}

// Mentor Levels Dialog Component
export function MentorLevelsDialog() {
  const mentorRanks = [
    { name: "Ixchel Initiate", emoji: "🌙", reviews: "0 - 7" },
    { name: "Chilan Apprentice", emoji: "📜", reviews: "8 - 21" },
    { name: "Nacom Advisor", emoji: "💎", reviews: "22 - 44" },
    { name: "Ah Kin Master", emoji: "☀️", reviews: "45 - 79" },
    { name: "K'uhul Sage", emoji: "🏔️", reviews: "80+" },
  ];

  return <LevelsDialog dialogTitle="Mentor Levels" ranks={mentorRanks} />;
}
