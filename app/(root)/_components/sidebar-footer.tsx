import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface IconProps {
  type: string;
}

export const Icon: React.FC<IconProps> = ({ type }) => {
  switch (type) {
    case "Move More":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
          <path
            className="fill-blue-200"
            d="M9.423 12.278H.87L11.614.458l-1.037 7.264h8.553L8.386 19.542l1.037-7.264Zm-6.293-1h7.447l-.74 5.18 7.033-7.736H9.423l.74-5.18-7.033 7.736Z"
            opacity=".8"
          />
        </svg>
      );
    case "Eat Healthier":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24">
          <g fill="none" fillRule="nonzero" opacity=".8">
            <path
              className="fill-blue-600"
              d="M14.416 3.527C13.841 4.39 13.5 5.242 13.5 6a1.5 1.5 0 1 0 3 0c0-.758-.34-1.61-.916-2.473A8.962 8.962 0 0 0 15 2.748c-.2.239-.398.5-.584.78ZM17.5 6a2.5 2.5 0 1 1-5 0c0-.992.41-2.015 1.084-3.027a9.979 9.979 0 0 1 1.062-1.327L15 1.293l.354.353a9.979 9.979 0 0 1 1.062 1.326C17.091 3.986 17.5 5.009 17.5 6ZM6 6.5c-1.374 0-2.5-1.055-2.5-2.375 0-.243.043-.492.125-.746.176-.548.523-1.108.99-1.672A9.774 9.774 0 0 1 5.677.62L6 .344l.323.275a9.774 9.774 0 0 1 1.061 1.089c.468.563.815 1.123.991 1.671.082.254.125.503.125.746C8.5 5.445 7.374 6.5 6 6.5Zm-.615-4.154c-.393.474-.678.933-.808 1.339-.051.16-.077.307-.077.44C4.5 4.877 5.164 5.5 6 5.5s1.5-.623 1.5-1.375c0-.133-.026-.28-.077-.44-.13-.406-.415-.865-.808-1.34A8.746 8.746 0 0 0 6 1.682c-.21.205-.42.43-.615.665Z"
            />
          </g>
        </svg>
      );
    case "Sleep Enough":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <g fill="none" fillRule="nonzero" opacity=".8">
            <path
              className="fill-blue-600"
              d="M11.5 1h1v4h-1V1ZM23 11.5v1h-4v-1h4ZM12.5 23h-1v-4h1v4ZM1 12.5v-1h4v1H1Z"
            />
            <path
              className="fill-blue-200"
              d="M12 23.5C5.649 23.5.5 18.351.5 12S5.649.5 12 .5 23.5 5.649 23.5 12 18.351 23.5 12 23.5Zm0-1c5.799 0 10.5-4.701 10.5-10.5S17.799 1.5 12 1.5 1.5 6.201 1.5 12 6.201 22.5 12 22.5Zm0-8a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm0-1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
            />
          </g>
        </svg>
      );
    case "Positive Mindset":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            className="fill-blue-600"
            d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"
          />
          <path
            className="fill-blue-200"
            d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"
          />
        </svg>
      );
    // Add more case statements for additional icons
    default:
      return <div>M</div>;
  }
};

// Types for the quote data
interface Quote {
  type: string;
  description: string;
}

// List of quotes with types and descriptions only
const quotes: Quote[] = [
  {
    type: "Move More",
    description: "Movement fuels growth. Take a break and move forward.",
  },
  {
    type: "Eat Healthier",
    description: "Nourish your body, nourish your mind.",
  },
  {
    type: "Sleep Enough",
    description: "Your sleep is an investment in tomorrow's energy.",
  },
  {
    type: "Positive Mindset",
    description: "A positive mindset creates endless possibilities.",
  },
  {
    type: "Relationships",
    description: "Strong relationships lead to lasting success.",
  },
  {
    type: "Mentorship",
    description: "When you teach, you learn twice.",
  },
  {
    type: "Move More",
    description: "Moving more helps you think clearer.",
  },
  {
    type: "Eat Healthier",
    description: "Every vegetable is a step toward a healthier you.",
  },
  {
    type: "Sleep Enough",
    description: "Sleep well, perform better.",
  },
  {
    type: "Positive Mindset",
    description: "Optimism is the key to resilience.",
  },
  {
    type: "Mentorship",
    description: "Sharing knowledge is the greatest gift.",
  },
  {
    type: "Sleep Enough",
    description: "Rest is not wasted time. It's energy for the future.",
  },
  {
    type: "Move More",
    description: "Small steps lead to big health wins.",
  },
  {
    type: "Mentorship",
    description: "Mentorship is the bridge between experience and learning.",
  },
  {
    type: "Positive Mindset",
    description: "Stay positive, stay unstoppable.",
  },
  {
    type: "Eat Healthier",
    description: "Healthy habits build a strong foundation.",
  },
  {
    type: "Mentorship",
    description: "Teaching others strengthens your own understanding.",
  },
  {
    type: "Move More",
    description: "Every step you take is progress.",
  },
  {
    type: "Eat Healthier",
    description: "Fuel your body with what it deserves.",
  },
  {
    type: "Sleep Enough",
    description: "Sleep is the foundation of a productive day.",
  },
  {
    type: "Positive Mindset",
    description: "A positive attitude attracts success.",
  },
  {
    type: "Relationships",
    description: "The power of relationships fuels your journey.",
  },
  {
    type: "Mentorship",
    description:
      "Learning through mentoring strengthens both the giver and the receiver.",
  },
  {
    type: "Move More",
    description: "Movement sparks creativity.",
  },
  {
    type: "Eat Healthier",
    description: "What you eat is who you become.",
  },
  {
    type: "Sleep Enough",
    description: "Quality sleep is your superpower.",
  },
  {
    type: "Positive Mindset",
    description: "A positive outlook makes challenges easier.",
  },
  {
    type: "Relationships",
    description: "Building relationships builds resilience.",
  },
  {
    type: "Mentorship",
    description: "The best teachers never stop learning.",
  },
  {
    type: "Move More",
    description: "Take time to move, it fuels your mind.",
  },
  {
    type: "Eat Healthier",
    description: "Nourish your body for a brighter tomorrow.",
  },
  {
    type: "Sleep Enough",
    description: "Sleep brings clarity and focus.",
  },
  {
    type: "Positive Mindset",
    description: "Your mindset shapes your world.",
  },
  {
    type: "Relationships",
    description: "Together, we grow stronger.",
  },
  {
    type: "Mentorship",
    description: "Mentorship isn't just giving, it's receiving.",
  },
  {
    type: "Move More",
    description: "Keep moving forward, even if it's just a little.",
  },
  {
    type: "Eat Healthier",
    description: "What you eat fuels your ambition.",
  },
  {
    type: "Sleep Enough",
    description: "Sleep fuels your productivity.",
  },
  {
    type: "Positive Mindset",
    description: "Positivity is contagious, spread it.",
  },
  {
    type: "Relationships",
    description: "Relationships are the glue that hold success together.",
  },
  {
    type: "Mentorship",
    description: "Learning is the most powerful form of growth.",
  },
  {
    type: "Move More",
    description: "A body in motion stays energized.",
  },
  {
    type: "Eat Healthier",
    description: "Healthy choices create lifelong rewards.",
  },
  {
    type: "Sleep Enough",
    description: "Sleep is not a luxury; it's a necessity.",
  },
  {
    type: "Positive Mindset",
    description: "A positive mind attracts positive outcomes.",
  },
  {
    type: "Relationships",
    description: "Strong connections breed strong results.",
  },
  {
    type: "Mentorship",
    description: "Mentoring is the greatest way to learn.",
  },
  {
    type: "Move More",
    description: "Move often, feel better.",
  },
  {
    type: "Eat Healthier",
    description: "Feed your body, fuel your goals.",
  },
  {
    type: "Sleep Enough",
    description: "Prioritize sleep, prioritize success.",
  },
  {
    type: "Positive Mindset",
    description: "A positive mindset makes anything possible.",
  },
  {
    type: "Relationships",
    description: "Relationships unlock potential.",
  },
  {
    type: "Mentorship",
    description: "By teaching, we transform our own knowledge.",
  },
  {
    type: "Move More",
    description: "Small movements add up to big changes.",
  },
  {
    type: "Eat Healthier",
    description: "Healthy eating, happy living.",
  },
  {
    type: "Sleep Enough",
    description: "Sleep well, live well.",
  },
  {
    type: "Positive Mindset",
    description: "Positivity breeds opportunity.",
  },
  {
    type: "Relationships",
    description: "The strength of your network defines your journey.",
  },
  {
    type: "Mentorship",
    description: "In mentorship, everyone wins.",
  },
  {
    type: "Move More",
    description: "Move more today, thrive tomorrow.",
  },
  {
    type: "Eat Healthier",
    description: "Eat smarter, live better.",
  },
  {
    type: "Sleep Enough",
    description: "Rest fuels resilience.",
  },
  {
    type: "Positive Mindset",
    description: "A positive perspective unlocks doors.",
  },
  {
    type: "Relationships",
    description: "Relationships are the true currency of success.",
  },
  {
    type: "Mentorship",
    description: "Mentors are learners for life.",
  },
  {
    type: "Move More",
    description: "Your movement inspires your mindset.",
  },
  {
    type: "Eat Healthier",
    description: "Healthy food, healthy mind.",
  },
  {
    type: "Sleep Enough",
    description: "Sleep is the ultimate performance booster.",
  },
  {
    type: "Positive Mindset",
    description: "Optimism turns challenges into opportunities.",
  },
  {
    type: "Relationships",
    description: "The connections you build shape your future.",
  },
  {
    type: "Mentorship",
    description: "Mentorship is a two-way street of growth.",
  },
  {
    type: "Move More",
    description: "Take time to move, your body will thank you.",
  },
  {
    type: "Eat Healthier",
    description: "Eat well, think well.",
  },
  {
    type: "Sleep Enough",
    description: "A good night's sleep fuels a powerful day.",
  },
  {
    type: "Positive Mindset",
    description: "Positive thinking attracts positive results.",
  },
  {
    type: "Relationships",
    description: "Relationships are the foundation of achievement.",
  },
  {
    type: "Mentorship",
    description: "When we mentor, we grow together.",
  },
  {
    type: "Move More",
    description: "Every movement counts toward your health.",
  },
  {
    type: "Eat Healthier",
    description: "Feed your body the energy it needs to thrive.",
  },
  {
    type: "Sleep Enough",
    description: "Rest to be your best.",
  },
  {
    type: "Positive Mindset",
    description: "A positive mindset makes every step easier.",
  },
  {
    type: "Relationships",
    description: "Build strong relationships, build strong results.",
  },
  {
    type: "Mentorship",
    description: "Mentoring is learning through sharing.",
  },
  {
    type: "Move More",
    description: "Move with purpose, live with purpose.",
  },
  {
    type: "Eat Healthier",
    description: "Healthy choices create a healthier life.",
  },
  {
    type: "Sleep Enough",
    description: "Sleep recharges your mind, body, and spirit.",
  },
  {
    type: "Positive Mindset",
    description: "A positive outlook is the start of every success.",
  },
  {
    type: "Relationships",
    description: "Relationships empower your journey.",
  },
  {
    type: "Mentorship",
    description: "Mentorship is a journey of mutual growth.",
  },
  {
    type: "Move More",
    description: "Active living, active learning.",
  },
  {
    type: "Eat Healthier",
    description: "Nourish your body, fuel your dreams.",
  },
  {
    type: "Sleep Enough",
    description: "Prioritize rest for peak performance.",
  },
  {
    type: "Positive Mindset",
    description: "A positive mindset turns challenges into opportunities.",
  },
  {
    type: "Relationships",
    description: "Strong relationships are built on shared knowledge.",
  },
  {
    type: "Mentorship",
    description: "In mentorship, the mentor and mentee grow together.",
  },
  {
    type: "Move More",
    description: "Small actions today create big results tomorrow.",
  },
  {
    type: "Eat Healthier",
    description: "Eat well, live well.",
  },
  {
    type: "Sleep Enough",
    description: "Sleep empowers you to do more.",
  },
  {
    type: "Positive Mindset",
    description: "Positivity is a force for change.",
  },
  {
    type: "Relationships",
    description: "Build meaningful relationships, build meaningful lives.",
  },
];

// Helper function to get a random quote
function getRandomQuote(): Quote {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

const SidebarFooter = () => {
  const quote = getRandomQuote();

  return (
    <div className="mt-auto p-4">
      <Card x-chunk="dashboard-02-chunk-0">
        <CardHeader className="p-4">
          <CardTitle className="flex items-center gap-2">
            <div className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-transparent [background:linear-gradient(theme(colors.blue.800),_theme(colors.blue.800))_padding-box,_conic-gradient(theme(colors.blue.400),_theme(colors.blue.700)_25%,_theme(colors.blue.700)_75%,_theme(colors.blue.400)_100%)_border-box]">
              <Icon type={quote.type} />
            </div>
          </CardTitle>
          <CardDescription className="font-semibold text-base text-blue-600">
            {quote.type}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">{quote.description}</CardContent>
      </Card>
    </div>
  );
};

export default SidebarFooter;
