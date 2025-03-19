/* eslint-disable react/prop-types */
import { memo, useEffect, useRef } from "react";
// import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import { PaperPlaneTilt, Smiley } from "@phosphor-icons/react";
import { Paperclip } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "@/redux/slices/chat";

// proptypes

function MessageBoxInput({ message, setMessage, setAttachments, attachments }) {
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const selectedChatId = useSelector((state) => state.chat.selectedChatId);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if message has any attahcments
    if (attachments.length > 0) return;

    const formData = new FormData();
    formData.append("chatId", selectedChatId);
    formData.append("content", message.trim());

    if (message.length > 0) {
      dispatch(sendMessage(formData));
    }
    setMessage("");
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    if (files.length > 3) {
      const updatedFiles = Array.from(files).slice(0, 4);
      setAttachments(updatedFiles);
    } else {
      setAttachments(files);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form
      // className="message-input-container  h-16 w-full pb-3  flex items-center justify-evenly lg:px-4 bg-white shrink-0"
      onSubmit={handleSubmit}
      className="relative w-full"
    >
      <div className="message-input-container  h-16 w-full  pb-3  flex items-center justify-evenly lg:px-4 bg-white shrink-0">
        <div className="message-input pr-2 h-11  w-[calc(100%-80px)]  flex items-center bg-slate-100  rounded-[30px] overflow-hidden border--[1px]">
          <IconButton className="emoji-button h-10 w-10">
            <Smiley size={20} color="black" />
          </IconButton>
          <IconButton
            className="attachment-button h-10 w-10"
            onClick={() => fileInputRef.current.click()}
          >
            <Paperclip size={20} color="black" />
          </IconButton>

          <input
            type="file"
            className="hidden"
            name="attachments"
            id="attachments"
            accept="image/* video/*"
            ref={fileInputRef}
            multiple
            onChange={handleFileChange}
          />
          <input
            className="h-11 w-[calc(100%-20px)]  pl-2 py-4 font-light leading-none outline-none rounded-[6px] bg-transparent text-black"
            type="text"
            name="message"
            id="message"
            maxLength={200}
            placeholder="Your message..."
            autoComplete="off"
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <IconButton
          className="message-send-button "
          sx={{
            backgroundColor: "#1976d2",
            height: "44px",
            width: "44px",
            padding: "none",
            borderRadius: "50%",
            ":hover": { backgroundColor: "#1976d4" },
          }}
          onClick={handleSubmit}
        >
          <PaperPlaneTilt size={20} color="white" />
        </IconButton>
      </div>
    </form>
  );
}

export default memo(MessageBoxInput);
