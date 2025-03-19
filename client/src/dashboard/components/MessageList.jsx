import { memo } from "react";
import PropTypes from "prop-types";
import MessageItem from "./MessageItem";

const formatMessages = (messages) => {
  const processedMessages = [];
  let lastDate = null;
  const allMessages = [...messages].reverse();
  allMessages.forEach((message) => {
    const messageDate = new Date(message?.createdAt);
    if (messageDate.getDate() !== lastDate) {
      processedMessages.push({
        type: "date",
        date: messageDate,
      });
    }
    processedMessages.push(message);
    lastDate = messageDate.getDate();
  });
  return processedMessages;
};

function MessageList({ messages = [] }) {
  console.log("messageListRendered");

  return (
    <ul
      // ref={chatListRef}
      className="messages-box  w-full h-[calc(100%-120px)] flex-grow px-3 py-4 flex flex-col-reverse  gap-2  overflow-auto bg-white  "
    >
      {formatMessages(messages)
        .reverse()
        .map((message, index) => (
          <MessageItem key={message?._id ?? index} message={message} />
        ))}
    </ul>
  );
}
MessageList.propTypes = {
  messages: PropTypes.array,
};

export default memo(MessageList);
