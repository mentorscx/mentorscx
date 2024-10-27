import {
  Clock,
  HeartHandshake,
  LucideIcon,
  Mail,
  AlertCircle,
  CheckCircleIcon,
  PartyPopperIcon,
} from "lucide-react";
import { Role, SessionStatus } from "@prisma/client";
import { SessionHeaderActions } from "./session-header-actions";

// Define the response interface
interface SessionHeaderResponse {
  header: string;
  content: string;
  Icon: LucideIcon;
  theme: string;
}

// Define theme mappings
const gradientColors: { [key: string]: string } = {
  green: "from-green-200/60 to-white text-green-500",
  yellow: "from-yellow-200/60 to-white text-yellow-500",
  blue: "from-blue-300/60 to-white text-blue-500",
  slate: "from-slate-300/60 to-white text-slate-500",
  danger: "from-danger-200/60 to-white text-danger-500",
  orange: "from-orange-200/60 to-white text-orange-500",
  sky: "from-sky-200/60 to-white text-sky-500",
};

const buttonColors: { [key: string]: string } = {
  green:
    "text-green-500 border-green-500 hover:text-green-500/80 hover:bg-green-500/10",
  yellow:
    "text-yellow-500 border-yellow-500 hover:text-yellow-500/80 hover:bg-yellow-500/10",
  blue: "text-blue-500 border-blue-500 hover:text-blue-500/80 hover:bg-blue-500/10",
  slate:
    "text-slate-500 border-slate-500 hover:text-slate-500/80 hover:bg-slate-500/10",
  danger:
    "text-danger-500 border-danger-500 hover:text-danger-500/80 hover:bg-danger-500/10",
  orange:
    "text-orange-500 border-orange-500 hover:text-orange-500/80 hover:bg-orange-500/10",
  sky: "text-sky-500 border-sky-500 hover:text-sky-500/80 hover:bg-sky-500/10",
};

// Function to get session header content
const getSessionHeaderContent = (
  currentRole: Role,
  status: SessionStatus,
  declinedBy: Role | null
): SessionHeaderResponse | undefined => {
  const headerContent: { [key: string]: SessionHeaderResponse } = {
    [`${Role.MENTOR}-${SessionStatus.AWAITING_HOST}`]: {
      header: "New session request received",
      content:
        "Please read the details of the request and select an option below.",
      Icon: Mail,
      theme: "yellow",
    },
    [`${Role.MENTOR}-${SessionStatus.ACCEPTED}`]: {
      header: "You accepted this session",
      content:
        "Ensure you’re ready to join the video call at the scheduled time. If needed, you can reschedule or cancel the call 24hrs before. Read more about it here",
      Icon: HeartHandshake,
      theme: "blue",
    },
    [`${Role.MENTOR}-${SessionStatus.DECLINED}`]: {
      header: "You declined this session",
      content:
        "You already explained to the mentee why you decided not to accept this call. If you’d like to encourage them to book again, shoot them a message.",
      Icon: AlertCircle,
      theme: "slate",
    },
    [`${Role.MENTEE}-${SessionStatus.AWAITING_HOST}`]: {
      header: "Your session request was sent successfully",
      content:
        "Now you just need to wait for the mentor’s response. Questions about responsiveness? Read more here.",
      Icon: Mail,
      theme: "yellow",
    },
    [`${Role.MENTEE}-${SessionStatus.ACCEPTED}`]: {
      header: "Your session request was accepted",
      content:
        "The mentor accepted! Ensure you’re ready to join the video call at the scheduled time. If needed, you can reschedule or cancel the call 24hrs before. Read more about it here",
      Icon: HeartHandshake,
      theme: "blue",
    },
    [`${Role.MENTEE}-${SessionStatus.DECLINED}`]: {
      header: "The mentor declined this session",
      content:
        "The mentor explained why they decided not to accept this call. If you’d like to ask for more details or to discuss the possibility to book again, shoot them a message.",
      Icon: Clock,
      theme: "slate",
    },
    [`${Role.MENTEE}-${SessionStatus.CANCELLED}-${Role.MENTOR}`]: {
      header: "The mentor cancelled this session",
      content:
        "The mentor explained why they decided to cancel this call. If you’d like to ask for more details or to discuss the possibility to book again, shoot them a message.",
      Icon: Clock,
      theme: "slate",
    },
    [`${Role.MENTOR}-${SessionStatus.CANCELLED}-${Role.MENTOR}`]: {
      header: "You cancelled this session",
      content:
        "You already explained to the mentee why you decided to cancel this call. If you’d like to encourage them to book again, shoot them a message.",
      Icon: Clock,
      theme: "slate",
    },
    [`${Role.MENTOR}-${SessionStatus.CANCELLED}-${Role.MENTEE}`]: {
      header: "The mentee cancelled this session",
      content:
        "The mentee explained why they decided to cancel this call. If you’d like to ask for more details or to discuss the possibility to book again, shoot them a message.",
      Icon: Clock,
      theme: "slate",
    },
    [`${Role.MENTEE}-${SessionStatus.CANCELLED}-${Role.MENTEE}`]: {
      header: "You cancelled this session",
      content:
        "You already explained to the mentee why you decided to cancel this call. If you’d like to encourage them to book again, shoot them a message.",
      Icon: Clock,
      theme: "slate",
    },
    [`${Role.MENTEE}-${SessionStatus.RESCHEDULED}-${Role.MENTOR}`]: {
      header: "The mentor rescheduled this session",
      content:
        "The mentor explained why they decided to reschedule this call. If you’d like to ask for more details or to discuss the possibility to book again, shoot them a message.",
      Icon: Clock,
      theme: "slate",
    },
    [`${Role.MENTEE}-${SessionStatus.RESCHEDULED}-${Role.MENTEE}`]: {
      header: "You rescheduled this session",
      content:
        "You explained why they decided to reschedule this call. If you’d like to ask for more details or to discuss the possibility to book again, shoot them a message.",
      Icon: Clock,
      theme: "slate",
    },
    [`${Role.MENTOR}-${SessionStatus.RESCHEDULED}-${Role.MENTOR}`]: {
      header: "You asked the mentee to reschedule",
      content:
        "The mentee will choose a new time from the availability set in your calendar. Please wait and confirm the requested time works in a timely manner.",
      Icon: Clock,
      theme: "danger",
    },
    [`${Role.MENTOR}-${SessionStatus.RESCHEDULED}-${Role.MENTEE}`]: {
      header: "The mentee rescheduled this session",
      content:
        "Your mentee will choose a new time from the availability set in your calendar. Please wait and confirm the requested time works in a timely manner.",
      Icon: Clock,
      theme: "danger",
    },
    [`${Role.MENTOR}-${SessionStatus.DONE}`]: {
      header: "Pending confirmation ",
      content: "The mentee has to confirm the call.",
      Icon: CheckCircleIcon,
      theme: "orange",
    },
    [`${Role.MENTEE}-${SessionStatus.DONE}`]: {
      header: "Did you have the call?",
      content:
        "According to our system, you should have completed this session already. If that’s the case, please hit confirm below.",
      Icon: CheckCircleIcon,
      theme: "orange",
    },
    [`${Role.MENTOR}-${SessionStatus.COMPLETED}`]: {
      header: "Ask the mentee for a review",
      content:
        "Looks like you completed the call. Please ask mentee for a review. Send a message to ask for one.",
      Icon: CheckCircleIcon,
      theme: "green",
    },
    [`${Role.MENTEE}-${SessionStatus.COMPLETED}`]: {
      header: "You completed the session",
      content:
        "Amazing. You completed the call. To encourage the mentor. Please leave a rating",
      Icon: CheckCircleIcon,
      theme: "green",
    },
    [`${Role.MENTOR}-${SessionStatus.REVIEWED}`]: {
      header: "The mentee left a review for you",
      content:
        "Looks like you completed the call and the mentee took the time to leave a review for you. Please share with others.",
      Icon: PartyPopperIcon,
      theme: "sky",
    },
    [`${Role.MENTEE}-${SessionStatus.REVIEWED}`]: {
      header: "You left a review",
      content:
        "Looks like you took the time to leave a review for each other after completing the call. Great job in promoting kindness.Please share with others.",
      Icon: PartyPopperIcon,
      theme: "sky",
    },
  };

  const key = `${currentRole}-${status}${declinedBy ? `-${declinedBy}` : ""}`;
  return headerContent[key];
};

// SessionHeader component
type Props = {
  sessionId: string;
  role: Role;
  status: SessionStatus;
  declinedBy: Role | null;
  otherUserId: string;
};

const SessionHeader = (props: Props) => {
  const details = getSessionHeaderContent(
    props.role,
    props.status,
    props.declinedBy
  );

  if (!details) return null;

  const theme = details.theme || "slate";
  const gradientClass = gradientColors[theme];
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

        <SessionHeaderActions
          sessionId={props.sessionId}
          role={props.role}
          status={props.status}
          buttonStyles={buttonStyles}
          otherUserId={props.otherUserId}
        />
      </div>
    </section>
  );
};

export default SessionHeader;
