import { useEffect, useState, useCallback } from 'react';
import useHttp from '../../hooks/useHttp';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';

const Comments = ({ quoteId }) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {
    sendRequest,
    data: comments,
    status,
    error,
  } = useHttp(getAllComments, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  let allComments;

  if (status === 'pending') {
    allComments = (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    allComments = <p>{error}</p>;
  }

  if (status === 'completed' && comments && comments.length > 0) {
    allComments = <CommentsList comments={comments} />;
  }

  if (status === 'completed' && comments && comments.length === 0) {
    allComments = <p>No comments yet!</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm quoteId={quoteId} onAddComment={addCommentHandler} />
      )}
      {allComments}
    </section>
  );
};

export default Comments;
