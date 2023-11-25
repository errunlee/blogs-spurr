import React from "react";
import InputComment from "./comment/InputComment";

const Comments = ({ comments, id }) => {
  console.log(comments);
  return (
    <div>
      <hr />
      <p className="mt-4 font-bold text-lg">Comments:</p>
      <InputComment comments={comments} id={id} />

      {comments.length > 0 ? (
        <>
          {comments.map((comment) => {
            return <p>{comment}</p>;
          })}
        </>
      ) : (
        <p>No comments to show.</p>
      )}
    </div>
  );
};

export default Comments;
