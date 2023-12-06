import React, { useState } from "react";
import noDp from "../../assets/dpAlternative.jpg";
import heart from "../../assets/icon-logos/heart.svg";
import CommentReply from "./CommentReply";
import CommentReplies from "./CommentReplies";

function SingleComment({ data,comments ,docId}) {
  const [isReplying, setIsReplying] = useState(false);
  const handleCommentReply = () => {
    setIsReplying(!isReplying);
  };
  const { comment, commentedBy ,id,replies} = data;

  return (
    <>
      <div className="transition-all border-2 rounded p-3 lg:w-1/2 w-full grid grid-cols-10 bg-slate-800 my-2 items-start text-sm lg:text-md">
        <p className="dp h-[40px] w-[40px] rounded-full bg-white col-span-2 lg:col-span-1">
          <img className="rounded-full" src={noDp} />
        </p>
        <div className="flex items-start flex-col col-span-6 lg:col-span-7">
          <p className="capitalize font-black text-yellow-500 m-0">
            {commentedBy}
          </p>
          <p className="m-0 text-sm lg:text-lg">{comment}</p>
          <div className="replies mt-2">
            <CommentReplies replies={replies}/>
          </div>
          {!isReplying ? (
            <button
              onClick={handleCommentReply}
              className="bg-gray-300 text-black px-1 rounded"
            >
              Reply
            </button>
          ) : (
            <CommentReply replyTo={commentedBy} id={id} setIsReplying={setIsReplying} comments={comments} docId={docId}/>
          )}
        </div>
        <button className="col-span-2">
          <img fill={"yellow"} height={50} width={50} src={heart} />
        </button>
      </div>
    </>
  );
}

export default SingleComment;
