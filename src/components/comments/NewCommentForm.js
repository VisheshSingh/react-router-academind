import { useEffect, useRef } from 'react';
import useHttp from '../../hooks/useHttp';
import { addComment } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './NewCommentForm.module.css';

const NewCommentForm = ({ quoteId, onAddComment }) => {
  console.log(quoteId);
  const commentTextRef = useRef();
  const { sendRequest, status, error } = useHttp(addComment);

  useEffect(() => {
    if (status === 'completed' && !error) {
      onAddComment();
    }
  }, [status, error, onAddComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    // optional: Could validate here
    if (commentTextRef.current.value.trim() === '') {
      return;
    }

    // send comment to server
    sendRequest({
      quoteId: quoteId,
      commentData: commentTextRef.current.value,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' && (
        <div className='centered'>
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
