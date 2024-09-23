"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "@/components/shared/star-rating";

interface ExpandableTextProps {
  text: string;
}

const ExpandableText = ({ text }: ExpandableTextProps) => {
  return (
    <motion.div
      className="mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <p className="text-gray-600 leading-relaxed">{text}</p>
    </motion.div>
  );
};

interface ReviewProps {
  name: string;
  rating: number;
  review: string;
  imageUrl: string;
  srcAlt: string;
  listView?: boolean;
}

export default function Review({
  name,
  rating,
  review,
  imageUrl,
  srcAlt,
  listView = false,
}: ReviewProps) {
  return (
    <motion.div
      className={`w-full max-w-2xl mx-auto`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white shadow-xl">
        <CardHeader className="text-center">
          {!listView && (
            <CardTitle
              className="text-2xl sm:text-3xl
             font-bold text-blue-600"
            >
              Customer Review
            </CardTitle>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="flex-shrink-0"
            >
              <Avatar
                className="h-20 w-20
                 border-4 border-blue-200"
              >
                <AvatarImage src={imageUrl} alt={srcAlt} />
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold text-blue-800">{name}</h3>

              <StarRating rating={rating} />
            </div>
          </div>
          <ExpandableText text={review} />
        </CardContent>
      </Card>
    </motion.div>
  );
}
