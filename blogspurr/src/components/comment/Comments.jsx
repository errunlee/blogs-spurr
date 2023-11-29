import React from "react";
import InputComment from "./InputComment";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
const Comments = ({ comments, id }) => {
  const user = useSelector((state) => state.user);

 
  return (
    <div>
      <hr />
      <p className="mt-4 font-bold text-lg">Comments:</p>
      <InputComment comments={comments} id={id} />

      {comments.length > 0 ? (
        <>
          <div className="flex flex-col mt-3">
            {comments.map((data,i) => {
              return (
               <SingleComment comments={comments} key={i} data={data} docId={id}/>
              );
            })}
          </div>
        </>
      ) : (
        <p>No comments to show.</p>
      )}
    </div>
  );
};

export default Comments;
