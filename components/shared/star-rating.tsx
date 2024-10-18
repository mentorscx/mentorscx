"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const MAX_STARS = 5;

type StarRatingProps = {
  rating: number;
};

export const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <div className="flex items-center mt-1">
      {[...Array(MAX_STARS)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <Star
            className={`h-5 w-5 ${
              i < rating
                ? "fill-yellow-500 text-yellow-500"
                : "fill-gray-300 text-gray-300"
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
};
