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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { arrayToValuesString } from "@/lib/utils";
import { formatMonthYear } from "@/lib/format";
import { PencilIcon } from "lucide-react";

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
    toolkit,
    industries,
    expertise,
    languages,
    country,
    joinedAt,
    location,
  } = data;

  if (
    city === null ||
    imageUrl === null ||
    username === null ||
    duration === null ||
    price === null ||
    languages === null ||
    city === null ||
    country === null
  ) {
    return null;
  }

  return (
    <div className="mb-6 bg-white max-w-5xl mx-auto">
      <div className="relative block overflow-hidden rounded shadow border border-gray-100 p-4 sm:p-6 lg:p-8">
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
              4.99
            </h4>
            <p className="text-sm text-muted-foreground text-end">
              319 reviews /
            </p>
            <p className="text-sm text-muted-foreground text-end">
              516 sessions
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
          <p className="text-md  text-gray-700 line-clamp-3">{bio}</p>
        </div>

        {/* skills Tab */}

        <div className=" border-1 p-3 rounded-sm shadow-sm bord border-gray-100">
          <Tabs defaultValue="expertise" className="w-full ">
            <TabsList>
              <TabsTrigger value="expertise">Expertise</TabsTrigger>
              <TabsTrigger value="industry">Industry</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>
            <TabsContent value="expertise" className="space-x-4 space-y-2">
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
                    className="text-muted-foreground"
                    key={expertise.name}
                  >
                    {expertise.name}
                  </Badge>
                ))}
            </TabsContent>
            <TabsContent value="industry" className="space-x-4 space-y-2">
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
            <TabsContent value="skills" className="space-x-4  space-y-2">
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
              <p className="text-xs text-gray-500">
                {formatMonthYear(joinedAt)}
              </p>
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
            <Button
              asChild
              variant="outline"
              className="text-blue-800"
              size="lg"
            >
              <Link href={`/dashboard/profile/${id}`}>View Profile</Link>
            </Button>

            <Button size="lg" asChild>
              <Link href={`/dashboard/schedule/${id}`}>Book session</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
