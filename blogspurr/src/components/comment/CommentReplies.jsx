import React from "react";
import dp from '../../assets/dpAlternative.jpg'
function CommentReplies({ replies }) {
  return (
    <div className="border-l-2 ms-2 mb-2">
      {replies?.map((reply) => {
        return (
          <div className="ms-2 flex gap-2">
            <img className="w-[30px] h-[30px] rounded-full" src={dp}/>
            <div>
              <p className="text-yellow-600 capitalize"> {reply.repliedBy}</p>
              <p className=" text-slate-300">- {reply?.reply}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CommentReplies;
