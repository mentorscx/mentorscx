'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

export function DemoShareDocument() {
  return (
    <Card className="m-3">
      <CardContent>
        <div className="flex justify-between items-center space-x-3 pr-3 py-3">
          <div className="flex items-center space-x-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback>SD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xl font-semibold leading-none">
                Foti Panagiotakopoulos
              </p>
              <p className="text-md">Founder @ GrowthMentor</p>
              <div className="text-sm font-light text-muted-foreground">
                <p>Athens, Greece (+02:00 UTC) </p>
                <p>English, Greek</p>
                <p>from Florida, United States</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col space-y-1 border-2 p-2 items-center">
              <div className="flex space-x-1 text-center">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>{' '}
                <p>4.9 / 5</p>
              </div>
              <Separator className="my-4" />
              <div className="text-sm text-muted-foreground text-center">
                315 reviews
              </div>
              <Separator className="my-4" />
              <div className="text-sm text-muted-foreground text-center">
                360 sessions
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between items-center space-x-3">
          <div className="basis-3/4">
            <p className="font-light font-sans">
              As VP of Growth at EuroVPS, I had to make a LOT of decisions,
              daily. This got exhausting, especially if I had multiple good
              ideas on how to do something, but was not sure which to choose.
              Moments like these inspired me to build GrowthMentor. Does this
              resonate? If so, I would love to try and help you.{' '}
            </p>
          </div>
          <div className="border-2 basis-1/4 text-center">
            Available at:
            <div className="text-sm text-muted-foreground">Monday</div>
            <div className="text-sm text-muted-foreground">8:00 PM</div>
          </div>
        </div>

        <Separator className="my-4" />
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Button variant="secondary">More Info!</Button>
            <Button>Book Now!</Button>
          </div>
          <div className="flex items-center space-x-3">
            <div>
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z"
                />
              </svg>
            </div>
            <div>
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 15 15"
              >
                <path
                  fillRule="evenodd"
                  d="M7.979 5v1.586a3.5 3.5 0 0 1 3.082-1.574C14.3 5.012 15 7.03 15 9.655V15h-3v-4.738c0-1.13-.229-2.584-1.995-2.584-1.713 0-2.005 1.23-2.005 2.5V15H5.009V5h2.97ZM3 2.487a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                  clipRule="evenodd"
                />
                <path d="M3 5.012H0V15h3V5.012Z" />
              </svg>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
