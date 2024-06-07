import {
  Clock,
  HeartHandshake,
  LucideIcon,
  Mail,
  AlertCircle,
} from "lucide-react";

import { Role, SessionStatus } from "@prisma/client";
import { SessionHeaderActions } from "./session-header-actions";

interface SessionHeaderResponse {
  header: string;
  content: string;
  Icon: LucideIcon;
  theme: string;
}

const getContentForSessionHeader = (
  currentRole: Role,
  status: SessionStatus,
  declinedBy: Role | null
): SessionHeaderResponse | undefined => {
  if (currentRole === Role.MENTOR) {
    if (status === SessionStatus.AWAITING_HOST) {
      return {
        header: "New session request received",
        content:
          "Please read the details of the request and select an option below.",
        Icon: Mail,
        theme: "yellow",
      };
    } else if (status === SessionStatus.ACCEPTED) {
      return {
        header: "You accepted this session",
        content:
          "Ensure you’re ready to join the video call at the scheduled time. If needed, you can reschedule or cancel the call 24hrs before. Read more about it here",
        Icon: HeartHandshake,
        theme: "blue",
      };
    } else if (status === SessionStatus.REJECTED) {
      return {
        header: "You declined this session",
        content:
          "You already explained to the mentee why you decided not to accept this call. If you’d like to encourage them to book again, shoot them a message.",
        Icon: AlertCircle,
        theme: "slate",
      };
    } else if (status === SessionStatus.CANCELLED) {
      return {
        header: "You cancelled this session",
        content:
          "You already explained to the mentee why you decided to cancel this call. If you’d like to encourage them to book again, shoot them a message.",
        Icon: Clock,
        theme: "slate",
      };
    } else if (status === SessionStatus.RESCHEDULED) {
      if (declinedBy === Role.MENTOR) {
        return {
          header: "You asked the mentee to reschedule",
          content:
            "The mentee will choose a new time from the availability set in your calendar. Please wait and confirm the requested time works in a timely manner.",
          Icon: Clock,
          theme: "danger",
        };
      }
    }
  } else if (currentRole === Role.MENTEE) {
    if (status === SessionStatus.AWAITING_HOST) {
      return {
        header: "Your session request was sent successfully",
        content:
          "Now you just need to wait for the mentor’s response. Questions about responsiveness? Read more here. ",
        Icon: Mail,
        theme: "yellow",
      };
    } else if (status === SessionStatus.ACCEPTED) {
      return {
        header: "Your session request was accepted",
        content:
          "The mentor accepted! Ensure you’re ready to join the video call at the scheduled time.  If needed, you can reschedule or cancel the call 24hrs before. Read more about it here",
        Icon: HeartHandshake,
        theme: "blue",
      };
    } else if (status === SessionStatus.REJECTED) {
      return {
        header: "The mentor declined this session",
        content:
          "The mentor explained why they decided not to accept this call. If you’d like to ask for more details or to discuss the possibility to book again, shoot them a message.",
        Icon: Clock,
        theme: "slate",
      };
    } else if (status === SessionStatus.CANCELLED) {
      return {
        header: "The mentor cancelled this session",
        content:
          "The mentor explained why they decided to cancel this call. If you’d like to ask for more details or to discuss the possibility to book again, shoot them a message.",
        Icon: Clock,
        theme: "slate",
      };
    } else if (status === SessionStatus.RESCHEDULED) {
      if (declinedBy === Role.MENTOR) {
        return {
          header: "The mentor rescheduled this session",
          content:
            "The mentor explained why they decided to reschedule this call. If you’d like to ask for more details or to discuss the possibility to book again, shoot them a message.",
          Icon: Clock,
          theme: "slate",
        };
      }
      if (declinedBy === Role.MENTEE) {
        return {
          header: "The mentor rescheduled this session",
          content:
            "The mentor explained why they decided to reschedule this call. If you’d like to ask for more details or to discuss the possibility to book again, shoot them a message.",
          Icon: Clock,
          theme: "slate",
        };
      }
    }
  }
};

type Props = {
  sessionId: string;
  role: Role;
  status: SessionStatus;
  declinedBy: Role | null;
};

const gradientColors: {
  [key: string]: string;
} = {
  green: "from-green-200/60 to-white text-green-500",
  yellow: "from-yellow-200/60 to-white text-yellow-500",
  blue: "from-blue-300/60 to-white text-blue-500",
  slate: "from-slate-300/60 to-white text-slate-500",
  danger: "from-danger-200/60 to-white text-danger-500",
};

const buttonColors: {
  [key: string]: string;
} = {
  green:
    "text-green-500 border-green-500 hover:text-green-500/80 hover:bg-green-500/10",
  yellow:
    "text-yellow-500 border-yellow-500 hover:text-yellow-500/80 hover:bg-yellow-500/10",
  blue: "text-blue-500 border-blue-500 hover:text-blue-500/80 hover:bg-blue-500/10",
  slate:
    "text-slate-500 border-slate-500 hover:text-slate-500/80 hover:bg-slate-500/10",
  danger:
    "text-danger-500 border-danger-500 hover:text-danger-500/80 hover:bg-danger-500/10",
};

const SessionHeader = ({ sessionId, role, status, declinedBy }: Props) => {
  const details = getContentForSessionHeader(role, status, declinedBy);

  const theme: string = details?.theme || "slate";
  const gradientClass: string = gradientColors[theme];

  if (!details) return null;

  const buttonThemeClasses = buttonColors[theme];

  const buttonStyles = `rounded-full hover:bg-background border-1 font-semibold ${buttonThemeClasses}`;

  return (
    <section
      className={`p-3 md:p-6 bg-background rounded shadow bg-gradient-to-b ${gradientClass}`}
    >
      <div className="flex flex-col items-center justify-center space-y-3">
        <details.Icon className="h-24 w-24" />
        <h3 className="px-3 text-center font-semibold text-2xl md:text-3xl">
          {details.header}
        </h3>
        <p className="px-3 md:px-24 text-center">{details.content}</p>

        {/* SESSION ACTIONS */}
        <SessionHeaderActions
          sessionId={sessionId}
          role={role}
          status={status}
          buttonStyles={buttonStyles}
        />
      </div>
    </section>
  );
};

export default SessionHeader;
