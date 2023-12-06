import React, { useEffect, useRef, useState } from "react";
import dbService from "../../firebase/config";
import { useSelector } from "react-redux";

function CommentReply({ id, setIsReplying, comments, docId, replyTo }) {
  const replyingTo = `@${replyTo}, `;
  const [reply, setReply] = useState(replyingTo || null);
  const inputRef = useRef(null);
  const currentUser = useSelector((state) => state.user);

  const postReply = async () => {
    const payload = {
      repliedBy: currentUser.displayName || currentUser.email,
      reply,
    };
    await dbService.replyToComment(id, comments, payload, docId);
    setReply("");
    setIsReplying(false);
  };

  useEffect(() => {
    // inputRef.current.foucs();
  },[]);

  return (
    <div className="mt-1 comment-reply-box">
      <input
      autoFocus
        ref={inputRef}
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        className="bg-slate-700 border-0 px-2 py-1 rounded"
        type="text"
        placeholder="type your reply here "
      ></input>
      <button
        onClick={postReply}
        className="mx-1 mt-2 bg-blue-200 rounded px-2 py-1 text-black"
      >
        Reply
      </button>
      <button
        onClick={() => setIsReplying(false)}
        className=" bg-red-800 rounded px-2 py-1 text-white"
      >
        Cancel
      </button>
    </div>
  );
}

export default CommentReply;
