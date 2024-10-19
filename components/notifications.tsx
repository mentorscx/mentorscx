"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { BellIcon, CheckIcon, MailIcon } from "lucide-react";
import NotificationsProvider from "@/components/providers/liveblocks-provider";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  InboxNotification,
  InboxNotificationList,
  InboxNotificationCustomKindProps,
} from "@liveblocks/react-ui";
import {
  useInboxNotifications,
  useDeleteAllInboxNotifications,
  useMarkAllInboxNotificationsAsRead,
  useMarkInboxNotificationAsRead,
} from "@liveblocks/react/suspense";

// WarningIcon component handles the display of the warning icon
function WarningIcon() {
  return <MailIcon className="w-5 h-5 text-blue-500" />;
}

// AlertNotification component displays individual notifications
function AlertNotification({
  inboxNotification,
}: InboxNotificationCustomKindProps<`$${string}`>) {
  const { title, message } = inboxNotification.activities[0].data;
  const markNotificationAsRead = useMarkInboxNotificationAsRead();

  const handleReadNotification = async (id: string) => {
    try {
      await markNotificationAsRead(id);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  return (
    <InboxNotification.Custom
      title={<strong>{title}</strong>}
      aside={
        <div>
          <WarningIcon />
        </div>
      }
      inboxNotification={inboxNotification}
      className="flex items-center gap-4 my-2"
      showActions={false}
    >
      <div className="mb-2">{message}</div>
    </InboxNotification.Custom>
  );
}

// NotificationBell component handles the display of the bell icon and unread count
function NotificationBell({ count }: { count: number }) {
  return (
    <PopoverTrigger className="relative flex h-10 w-10 items-center justify-center rounded-lg">
      <BellIcon className="h-6 w-6 text-slate-500" />
      {count > 0 && (
        <div className="absolute right-0.5 top-0.5 z-20 w-4 h-4 rounded-full bg-blue-500 text-xs text-center text-white">
          {count}
        </div>
      )}
    </PopoverTrigger>
  );
}

// NotificationsPopover component manages the display and interactions of notifications
function NotificationsPopover() {
  const { inboxNotifications } = useInboxNotifications();
  const markAllAsRead = useMarkAllInboxNotificationsAsRead();
  const deleteAllNotifications = useDeleteAllInboxNotifications();
  const markNotificationAsRead = useMarkInboxNotificationAsRead();

  const unreadNotifications = inboxNotifications.filter(
    (notification) => !notification.readAt
  );

  const count = unreadNotifications.length;

  const handleReadNotification = async (id: string) => {
    try {
      await markNotificationAsRead(id);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  const handleDeleteAllNotifications = async () => {
    try {
      await deleteAllNotifications();
    } catch (error) {
      console.error("Failed to delete all notifications:", error);
    }
  };

  return (
    <Popover modal={true}>
      <NotificationBell count={count} />
      <PopoverContent
        align="end"
        className="w-[434px] border-none shadow-lg !important;"
      >
        <ScrollArea className="flex max-h-[320px] flex-col pl-0 pr-3">
          <div className="flex justify-between items-center mb-4">
            <span>{count} unread</span>
            <div className="flex gap-4">
              <Button onClick={handleMarkAllAsRead}>Read all</Button>
              <Button onClick={handleDeleteAllNotifications} variant="outline">
                Delete all
              </Button>
            </div>
          </div>

          <InboxNotificationList>
            {unreadNotifications.length === 0 ? (
              <p className="py-2 text-center text-dark-500">
                No new notifications
              </p>
            ) : (
              unreadNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex gap-2 items-center justify-between"
                >
                  <InboxNotification
                    key={notification.id}
                    inboxNotification={notification}
                    className="divide-y-1"
                    kinds={{
                      $alert: AlertNotification,
                    }}
                  />
                  <Button
                    className="shrink-0"
                    variant="outline"
                    size="icon"
                    onClick={() => handleReadNotification(notification.id)}
                  >
                    <CheckIcon className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </InboxNotificationList>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

// Notifications component serves as the entry point, using the NotificationsProvider
const Notifications = () => {
  return (
    <NotificationsProvider>
      <NotificationsPopover />
    </NotificationsProvider>
  );
};

export default Notifications;
