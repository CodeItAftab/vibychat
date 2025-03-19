/* eslint-disable react/prop-types */
import { Check, Checks } from "phosphor-react";
import { getFromattedDate } from "../../utils/date";
// import AvatarWithoutStatus from "./AvatarWithoutStatus";
import { forwardRef, useState } from "react";
import { Link } from "react-router-dom";
// import { useEffect, useRef } from "react";
// import { InView } from "react-intersection-observer";
import { useSelector } from "react-redux";
// import { readIndividualMessage } from "@/redux/slices/chat";
// import { READ_MESSAGE } from "@/constants/event";
// import { useSocket } from "@/hooks/useSocket";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AvatarWithoutStatus from "./AvatarWithoutStatus";
import { Download, DownloadCloudIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { makeMessageViewdById } from "@/redux/slices/chat";

const MessageItem = forwardRef(function MessageItem({ message }, ref) {
  switch (message?.type) {
    case "text":
      return <TextMessage message={message} />;
    case "media":
      return <ImageMessage message={message} />;
    case "date":
      return <DateStamp date={message.date} ref={ref} />;
  }
});

const TextMessage = ({ message }) => {
  // const { socket } = useSocket();
  // const dispatch = useDispatch();

  return (
    <li
      className={`text-message bg-green--400 flex gap-3 h-fit w-fit max-h-[900px] max-w-[95%] shrink-0   ${
        message?.isSender && "self-end"
      }`}
      id={message?.isFirstUnread ? "first_unread" : ""}
    >
      <div className="flex flex-col">
        {/* <div className="text-wrap max-height-[600px] text-center "> */}
        <div className="text-wrap max-height-[600px] text-center w-full lg:max-w-[600px] max-w-[400px]">
          <p
            className={`message   flex justify-center text-base leading-normal tracking-wider break-all  px-3 py-1 rounded-full   max-h-[600px]  w-full lg:max-w-[600px] max-w-[400px] text-wrap   ${
              message?.isSender
                ? "bg-[#4853ee] text-white   order-2"
                : `bg-slate-200/60  text-black `
            }`}
          >
            {message.content}
          </p>
        </div>
        <div
          className={
            "flex gap-1 w-full h-5 items-center justify-end" +
            (message?.isSender ? "" : "justify-start")
          }
        >
          {message.isSender && (
            <span className="flex items-center justify-center">
              {message.state === "read" && (
                <Checks
                  size={16}
                  color="#1976d2"
                  className="self-end text-slate-500"
                />
              )}
              {message.state === "delivered" && (
                <Checks size={16} className="self-end text-slate-500" />
              )}
              {message.state === "sent" && (
                <Check size={16} className="self-end text-slate-500" />
              )}
            </span>
          )}
          <span className={`time-stamp  text-[9px] leading-none`}>
            {new Date(message.createdAt).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </span>
        </div>
      </div>
      {/* </li> */}
    </li>
  );
};

const ImageMessage = ({ message }) => {
  const { selectedUser } = useSelector((state) => state.chat);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <li className={`text-message   flex flex-col rounded-sm shrink-0 `}>
        <div
          className={`image-box  rounded-sm shrink-0 p-1 flex flex-col gap-2   max-w-72 ${
            message?.isSender ? "self-end" : "self-start"
          }  `}
        >
          {message.attachments.map((attachment, index) => (
            <img
              key={index}
              src={attachment?.url || attachment?.preview}
              alt="preview"
              className={`max-w-60 min-w-48 max-h-60 object-cover  rounded-sm cursor-pointer border-[2px]  ${
                message?.isSender
                  ? "border-[#3582ff] self-end "
                  : "border-slate-200/60 "
              }`}
              onClick={handleOpen}
            />
          ))}

          {message.content && (
            <div className="flex items-start gap-1 flex-col rounded-[8px] text-wrap max-height-[600px] min-w-fit lg:max-w-[600px] max-w-[400px]">
              <p
                className={`message   flex    font-normal text-sm leading-normal tracking-wider break-all  py-1   px-2   min-h-6 max-h-[600px] shadow-sm drop-shadow-sm   w-fit lg:max-w-[600px] max-w-[400px] text-wrap   ${
                  message?.isSender
                    ? "bg-[#2d54f0] self-end text-white rounded--[20px_20px_8px_20px] rounded-md  order-2"
                    : "bg-slate-200/60 text-black rounded--[20px_20px_20px_8px] rounded-md"
                }`}
              >
                {message.content}
              </p>
            </div>
          )}

          {/* <img
            src={
              message?.attachments[0]?.url || message?.attachments[0]?.preview
            }
            alt="preview"
            className="h-36 w-36 object-cover grid-flow-col rounded-sm cursor-pointer "
            onClick={handleOpen}
          /> */}
        </div>
        <div
          className={
            "flex gap-1 w-full h-5 items-center justify-end" +
            (message?.isSender ? "" : "justify-start")
          }
        >
          {message.isSender && (
            <span className="flex items-center justify-center">
              {message.state === "read" && (
                <Checks
                  size={16}
                  color="#1976d2"
                  className="self-end text-slate-500"
                />
              )}
              {message.state === "delivered" && (
                <Checks size={16} className="self-end text-slate-500" />
              )}
              {message.state === "sent" && (
                <Check size={16} className="self-end text-slate-500" />
              )}
            </span>
          )}
          <span className={`time-stamp  text-[9px] leading-none`}>
            {new Date(message.createdAt).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </span>
        </div>
      </li>
      <Dialog
        className="rounded-none outline-none"
        open={open}
        onOpenChange={handleOpen}
      >
        {/* <DialogTrigger className="rounded-none flex items-center justify-center"></DialogTrigger> */}
        <DialogContent className="w-[70%] h-[620px] p-0 shadow-none border-none   rounded-none sm:rounded-none outline-none  max-w-full ">
          <DialogHeader className={"hidden"}>
            <DialogTitle>Image Preview</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="h-full w-full overflow-hidden flex flex-col bg-black">
            {/* <div className="h-11 w-full ">
              <div className="h-11 box-border flex items-center justify-between px-2 w-full  pr-4">
                <div className="h-full flex items-center gap-2 ">
                  <div className="h-8 w-8">
                    <AvatarWithoutStatus />
                  </div>
                  <span className="text-lg  font-medium text-slate-600">
                    {message?.isSender ? "You" : selectedUser.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Download size={18} className="" /> Download
                </div>
              </div>
            </div> */}
            <div className="h-[calc(100%-44px)] w-full bg-black  overflow-hidden px-4 flex items-center justify-center">
              <img
                className="h-[90%]  object-contain"
                src={
                  message?.attachments[0]?.url ||
                  message?.attachments[0]?.preview
                }
                alt="image"
              />
            </div>
            <div className="w-full text-center mb-4">
              <Button variant="outline">
                <DownloadCloudIcon size={18} />
                Download
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export const LinkMessage = () => {
  return (
    <li
      className={`text-message flex flex-col items-center px-2 py-2 bg-[#2d61f0ed]  h-36 max-h-fit w-80 max-w-[95%] rounded-sm shrink-0 self-end  `}
    >
      <Link
        to={"https://www.youtube.com/watch?v=MejbOFk7H6c"}
        target="_blank"
        className="link-preview-box h-20 w-full flex bg-white hover:shadow-sm rounded-sm cursor-pointer "
      >
        <div className="previewImage h-20 w-20 overflow-hidden rounded-sm shrink-0">
          <img
            src="https://i.ytimg.com/vi/MejbOFk7H6c/maxresdefault.jpg"
            alt="preview"
            className="h-full object-cover rounded-t-sm"
          />
        </div>
        <div className="LinkDescription h-full flex-grow flex flex-col  justify-center p-2 box-border">
          <p className="link-title text-sm leading-normal tract-wider">
            {"OK Go - Needing/Getting - Official Video".substring(0, 25) +
              "..."}
          </p>
          <p className="text-xs text-slate-500">
            {`https://linktr.ee/okgomusic Website | http://www.okgo.netInstagram |
            http://www.instagram.com/okgoTwitter |
            http://www.twitter.com/okgoFacebook | http://www....`.substring(
              0,
              35
            ) + "..."}
          </p>
          <span className="hostname text-xs text-slate-400 mt-1 ">
            {new URL("https://www.youtube.com/watch?v=MejbOFk7H6c").hostname}
          </span>
        </div>
      </Link>
      <Link
        to={"https://www.youtube.com/watch?v=MejbOFk7H6c"}
        target="_blank"
        className="hover:underline w-full h-12 inline-flex items-center"
      >
        <span className="text-sm  text-wrap hover:underline text-white leading-normal">
          https://www.youtube.com/watch?v=MejbOFk7H6c
        </span>
      </Link>
    </li>
  );
};

const DateStamp = forwardRef(function DateStamp({ date }, ref) {
  return (
    <li
      className="date-stamp my-2 flex justify-center items-center w-full h-4 gap-2"
      ref={ref}
    >
      {/* <div className="h-[1px] w-[20%] bg-slate-100"></div> */}
      <span className="date-stamp-text text-[10px] leading-none bg-slate-100 font-semibold w-16  text-slate-500 h-6 flex items-center justify-center  px-2 rounded-sm">
        {getFromattedDate(date)}
      </span>
      {/* <div className="h-[1px] w-[20%] bg-slate-100"></div> */}
    </li>
  );
});

export default MessageItem;
