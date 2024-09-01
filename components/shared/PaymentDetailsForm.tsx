"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Card {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
}

interface PaymentDetailsFormProps {
  onCardsUpdate: (cards: Card[]) => void;
  onSelectedCardChange: (card: Card | null) => void;
  price: number | undefined;
  onAddCardClick: () => void;
  cards: Card[];
  selectedCard: Card | null;
}

export function PaymentDetailsForm({
  onCardsUpdate,
  onSelectedCardChange,
  price,
  onAddCardClick,
  cards,
  selectedCard,
}: PaymentDetailsFormProps) {
  const handleCardSelection = (card: Card) => {
    onSelectedCardChange(card);
  };

  if (price === 0 || price === undefined) {
    return null;
  }

  return (
    <div className="w-full">
      {cards.length > 0 ? (
        cards.map((card) => (
          <div key={card.id} className="flex items-center space-x-2 mb-2">
            <input
              type="radio"
              id={card.id}
              name="selectedCard"
              checked={selectedCard?.id === card.id}
              onChange={() => handleCardSelection(card)}
              className="form-radio"
            />
            <label htmlFor={card.id} className="flex items-center space-x-2">
              <Badge variant="outline">
                {card.brand} ending {card.last4} (Expires {card.expMonth}/
                {card.expYear})
              </Badge>
            </label>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500 mb-2">
          No cards found. Add a new card to proceed.
        </p>
      )}

      <Button
        onClick={onAddCardClick}
        className="mt-4 h-auto font-normal text-blue-500 hover:text-blue-700 bg-transparent"
        variant="ghost"
        type="button"
      >
        <span className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add new card
        </span>
      </Button>
    </div>
  );
}
