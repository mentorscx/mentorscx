import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  MapPinIcon,
  LanguageIcon,
  GlobeAltIcon,
  BoltIcon,
  StarIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import { formatMonthYear } from "@/lib/format";
import RequestSessionButton from "@/components/shared/request-session-button";
import { formatToOneDp } from "@/lib/utils";

interface ProfileCardProps {
  user: string;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  const data = JSON.parse(user);

  const {
    id,
    city,
    imageUrl,
    username,
    duration,
    price,
    position,
    organization,
    role,
    bio,
    shortBio,
    toolkit,
    industries,
    expertise,
    languages,
    country,
    joinedAt,
    location,
    averageReview,
    totalSessions,
  } = data;

  if (
    city === null ||
    imageUrl === null ||
    username === null ||
    duration === null ||
    price === null ||
    languages === null ||
    city === null ||
    country === null ||
    shortBio === null
  ) {
    return null;
  }

  return (
    <Card className="mb-6 bg-white max-w-5xl mx-auto overflow-hidden p-4 sm:p-6 lg:p-8">
      {/* <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span> */}

      {/* header */}
      <div className="flex justify-between space-x-8 items-center">
        <div className="flex  space-x-3">
          {/* image */}
          <div className="block shrink-0">
            <div className="h-16 w-16">
              <Image
                alt={username}
                src={imageUrl}
                className="rounded-lg object-cover shadow-sm"
                height={64}
                width={64}
              />
            </div>
          </div>

          {/* profile in medium devices */}
          <div className="hidden md:block">
            <h3 className="h3">{username}</h3>
            <h6 className="h6">
              {position} @{organization}
            </h6>
            <div className="flex md:space-x-4 text-muted-foreground justify-start">
              <div className="flex items-center justify-start">
                <MapPinIcon className="h-4 w-4 mr-1 text-primary" />
                {city}, {country}
              </div>
              <div className="flex items-center ">
                <LanguageIcon className="h-4 w-4 mr-1 text-primary" />
                {languages.map((lang: any) => lang.name).join(", ")}
              </div>
            </div>

            <div className="flex md:space-x-4 text-muted-foreground justify-start">
              {/* <div className="flex items-center ">
                  <GlobeAltIcon className="h-4 w-4 mr-1" />
                  {data.city}, {data.country!.label}
                </div> */}
              {/* <div className="flex items-center">
                  <BoltIcon className="h-4 w-4 mr-1 text-green-600 fill-green-600 outline-green-600" />
                  Usually responds fast
                </div> */}
            </div>
          </div>
        </div>

        {/* review */}
        <div className=" w-[100px]">
          <h4 className="h4 font-semibold text-xl text-end flex items-center justify-end">
            <StarIcon className="h-4 w-4 mr-1 text-yellow-400 fill-yellow-400" />
            {formatToOneDp(averageReview)}
          </h4>
          <p className="text-sm text-muted-foreground text-end">
            {totalSessions} sessions
          </p>
          <p className="flex justify-end items-center">
            <span className="text-green-600 font-semibold">
              {price === 0 ? "Free" : `$${price}`}
            </span>
            <CreditCardIcon className="h-4 w-4 ml-1" />
          </p>
        </div>
      </div>

      {/* profile */}
      <div className="block mt-3 md:hidden ">
        <p>{username}</p>
        <p>
          {position} @{organization}
        </p>
        <div className="md:flex md:flex-wrap md:space-x-4 text-muted-foreground justify-start">
          {/* <div className="flex items-center ">
              <MapPinIcon className="h-4 w-4 mr-1" />
              Atens, Greece
            </div> */}
          <div className="flex items-center ">
            <LanguageIcon className="h-4 w-4 mr-1" />
            {languages.map((lang: any) => lang.name).join(", ")}
          </div>
          <div className="flex items-center ">
            <GlobeAltIcon className="h-4 w-4 mr-1" />
            {location}
          </div>
          <div className="flex items-center ">
            <BoltIcon className="h-4 w-4 mr-1 text-green-600 fill-green-600 outline-green-600" />
            Usually Active
          </div>
        </div>
      </div>

      {/* content */}
      <div className="my-4">
        <p className="text-md  text-gray-700 line-clamp-3">{shortBio}</p>
      </div>

      {/* skills Tab */}

      <div className="p-3 rounded-md shadow-sm border border-gray-200 ">
        <Tabs defaultValue="expertise" className="w-full ">
          <TabsList>
            <TabsTrigger value="expertise">Expertise</TabsTrigger>
            <TabsTrigger value="industry">Industry</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>
          <TabsContent value="expertise" className="mt-4 gap-4">
            {/* {expertise &&
                expertise.map((expertise: any) => (
                  <Badge
                    variant="outline"
                    className="text-muted-foreground"
                    key={expertise.value}
                  >
                    {expertise.label}
                  </Badge>
                ))} */}
            {expertise &&
              expertise.map((expertise: any) => (
                <Badge
                  variant="outline"
                  className="text-muted-foreground mr-2"
                  key={expertise.name}
                >
                  {expertise.name}
                </Badge>
              ))}
          </TabsContent>
          <TabsContent value="industry" className="mt-4 gap-4">
            {industries &&
              industries.map((industry: any) => (
                <Badge
                  variant="outline"
                  className="text-muted-foreground"
                  key={industry.name}
                >
                  {industry.name}
                </Badge>
              ))}
          </TabsContent>
          <TabsContent value="skills" className="mt-4 gap-4">
            {toolkit &&
              toolkit!.map((skill: any) => (
                <Badge
                  variant="outline"
                  className="text-muted-foreground"
                  key={skill.name}
                >
                  {skill.name}
                </Badge>
              ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* footer */}
      <div className="md:flex md:justify-between mt-3">
        <div className="hidden mt-6 md:flex gap-4 sm:gap-6">
          <div className="flex flex-col-reverse">
            <p className="text-xs text-gray-500">{formatMonthYear(joinedAt)}</p>
            <p className="text-sm font-medium text-gray-600">Joined</p>
          </div>

          <div className="flex flex-col-reverse">
            <p className="text-xs text-gray-500">
              {duration === null ? "30" : duration} minute
            </p>
            <p className="text-sm font-medium text-gray-600">Session time</p>
          </div>
        </div>

        <div className="flex space-x-6 justify-center items-end">
          <Button asChild variant="outline" size="lg">
            <Link href={`/profile/${id}`}>View profile</Link>
          </Button>
          <RequestSessionButton mentorId={id} />
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
