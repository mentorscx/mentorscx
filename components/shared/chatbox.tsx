import React from "react";

interface ChatBoxProps {
  senderImageUrl: string;
  receiverImageUrl: string;
  receiverName: string;
  status: string;
}
const ChatBox = ({
  senderImageUrl,
  receiverImageUrl,
  receiverName,
  status,
}: ChatBoxProps) => {
  return (
    <>
      {/* chat box */}
      <div className="w-80 h-96 flex flex-col border shadow-md bg-white">
        <div className="flex items-center justify-between border-b p-2">
          {/* user info */}
          <div className="flex items-center">
            <img className="rounded-full w-10 h-10" src={receiverImageUrl} />
            <div className="pl-2">
              <div className="font-semibold">
                <a className="hover:underline" href="#">
                  {receiverName}
                </a>
              </div>
              <div className="text-xs text-gray-600">{status}</div>
            </div>
          </div>
          {/* end user info */}
          {/* chat box action */}
          <div>
            <a
              className="inline-flex hover:bg-blue-50 rounded-full p-2"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </a>
            <button
              className="inline-flex hover:bg-blue-50 rounded-full p-2"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/* end chat box action */}
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {/* chat message */}
          <div className="flex items-center mb-4">
            <div className="flex-none flex flex-col items-center space-y-1 mr-4">
              <img className="rounded-full w-10 h-10" src={receiverImageUrl} />
            </div>
            <div className="flex-1 bg-blue-400 text-white p-2 rounded-lg mb-2 relative">
              <div>
                I need help with paid Ads, Are you avaiable on Thusday at 3:00
                PM?
              </div>
              {/* arrow */}
              <div className="absolute left-0 top-1/2 -translate-x-1/2 rotate-45 w-2 h-2 bg-blue-400" />
              {/* end arrow */}
            </div>
          </div>
          {/* end chat message */}
          {/* chat message */}
          <div className="flex items-center flex-row-reverse mb-4">
            <div className="flex-none flex flex-col items-center space-y-1 ml-4">
              <img className="rounded-full w-10 h-10" src={senderImageUrl} />
            </div>
            <div className="flex-1 bg-blue-100 text-gray-800 p-2 rounded-lg mb-2 relative">
              <div>Sure, You can book the calander, I will be available</div>
              {/* arrow */}
              <div className="absolute right-0 top-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-blue-100" />
              {/* end arrow */}
            </div>
          </div>
          {/* end chat message */}
          {/* chat message */}
          <div className="flex items-center mb-4">
            <div className="flex-none flex flex-col items-center space-y-1 mr-4">
              <img className="rounded-full w-10 h-10" src={receiverImageUrl} />
            </div>
            <div className="flex-1 bg-blue-400 text-white p-2 rounded-lg mb-2 relative">
              <div>Perfect, See you soon in the meeting</div>
              {/* arrow */}
              <div className="absolute left-0 top-1/2 -translate-x-1/2 rotate-45 w-2 h-2 bg-blue-400" />
              {/* end arrow */}
            </div>
          </div>
          {/* end chat message */}
        </div>
        <div className="flex items-center border-t p-2">
          {/* chat input action */}
          <div>
            <button
              className="inline-flex hover:bg-blue-50 rounded-full p-2"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
          {/* end chat input action */}
          <div className="w-full mx-2">
            <input
              className="w-full rounded-full border border-gray-200"
              type="text"
              defaultValue=""
              placeholder="Aa"
            />
          </div>
          {/* chat send action */}
          <div>
            <button
              className="inline-flex hover:bg-blue-50 rounded-full p-2"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
          {/* end chat send action */}
        </div>
      </div>
      {/* end chat box */}
    </>
  );
};

export default ChatBox;
