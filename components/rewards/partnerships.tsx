"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight, Check, Copy } from "lucide-react";
import { partners } from "@/constants/data";
import { Partner } from "@/lib/actions/shared.types";

type PerkDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  partner: Partner | null;
};

const PerkDialog = ({ isOpen, onClose, partner }: PerkDialogProps) => {
  const [isCopied, setIsCopied] = useState(false);

  if (!partner) return null;

  const handleClaim = async () => {
    try {
      await navigator.clipboard.writeText(partner.redemptionUrl);
      setIsCopied(true);
      toast.success("Redemption URL has been copied to your clipboard");

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);

      onClose();
    } catch (err) {
      toast.error("Failed to copy. Please try copying the URL manually");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col w-[95vw] max-w-4xl h-[90vh] max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl md:text-3xl font-bold flex items-center gap-4">
            <img
              src={partner.logo}
              alt={`${partner.name} logo`}
              width={40}
              height={40}
              className="rounded-lg object-cover"
            />
            {partner.name} Perks
          </DialogTitle>
          <DialogDescription className="text-lg md:text-xl">
            <Badge variant="outline"> {partner.category}</Badge>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="py-4 space-y-6">
            {/* Offer Section */}
            <section className="space-y-2">
              <h3 className="text-lg md:text-xl font-semibold">Offer</h3>
              <p className="text-base md:text-lg">{partner.offer}</p>
            </section>

            {/* Value Section */}
            <section className="space-y-2">
              <h3 className="text-lg md:text-xl font-semibold">Value</h3>
              <p className="text-base md:text-lg">{partner.value}</p>
            </section>

            {/* Summary Section */}
            <section className="space-y-2">
              <h3 className="text-lg md:text-xl font-semibold">Summary</h3>
              <p className="text-base md:text-lg">{partner.summary}</p>
            </section>

            {/* Details Section */}
            <section className="space-y-2">
              <h3 className="text-lg md:text-xl font-semibold">Details</h3>
              <ul className="list-disc pl-5 space-y-2">
                {partner.details.map((detail, index) => (
                  <li key={index} className="text-base md:text-lg">
                    {detail}
                  </li>
                ))}
              </ul>
            </section>

            {/* Redemption URL Section */}
            <section className="space-y-2">
              <h3 className="text-lg md:text-xl font-semibold">
                Redemption URL
              </h3>
              <a
                href={partner.redemptionUrl}
                className="text-base md:text-lg text-primary hover:underline break-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                {partner.redemptionUrl}
              </a>
            </section>

            {/* Terms Section */}
            <section className="space-y-2">
              <h3 className="text-lg md:text-xl font-semibold">Terms</h3>
              <ul className="list-disc pl-5 space-y-2">
                {partner.terms.map((term, index) => (
                  <li key={index} className="text-base md:text-lg">
                    {term}
                  </li>
                ))}
              </ul>
            </section>

            {/* How to Claim Section */}
            <section className="space-y-2">
              <h3 className="text-lg md:text-xl font-semibold">How to Claim</h3>
              <p className="text-base md:text-lg">{partner.howToClaim}</p>
            </section>
          </div>
        </ScrollArea>

        {/* Fixed Footer */}
        <div className="mt-auto border-t bg-background p-4 flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant="outline" className="min-w-[100px]">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="min-w-[120px] flex items-center gap-2"
              onClick={handleClaim}
            >
              <span>Claim discount</span>
              {isCopied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// PartnerCard component remains the same
const PartnerCard = ({
  partner,
  onShowDetails,
}: {
  partner: Partner;
  onShowDetails: (partner: Partner) => void;
}) => (
  <Card className="border shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
    <CardHeader className="space-y-4">
      <div className="flex justify-between items-start">
        <img
          src={partner.logo}
          alt={`${partner.name} logo`}
          width={40}
          height={40}
          className="rounded-lg object-cover"
        />
        <Badge variant="secondary" className="text-xs font-medium">
          {partner.category}
        </Badge>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">{partner.name}</h3>
        <p className="font-medium text-blue-600">{partner.offer}</p>
      </div>
    </CardHeader>
    <CardContent className="flex-1 flex flex-col justify-between space-y-4">
      <p className="text-sm text-muted-foreground">{partner.description}</p>
      <Button
        variant="default"
        className="w-full mt-auto group"
        onClick={() => onShowDetails(partner)}
      >
        <span className="flex items-center justify-center">
          {partner.ctaText}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Button>
    </CardContent>
  </Card>
);

export default function PartnerShowcase() {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleShowDetails = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedPartner(null);
  };

  return (
    <section className="container py-12 px-4 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner, index) => (
          <PartnerCard
            key={index}
            partner={partner}
            onShowDetails={handleShowDetails}
          />
        ))}
      </div>

      <PerkDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        partner={selectedPartner}
      />
    </section>
  );
}
