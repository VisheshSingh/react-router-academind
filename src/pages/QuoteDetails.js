import React, { useEffect } from 'react';
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/useHttp';
import { getSingleQuote } from '../lib/api';

const QuoteDetails = () => {
  const { id } = useParams();
  const match = useRouteMatch();
  const {
    data: loadedQuote,
    status,
    error,
    sendRequest,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(id);
  }, [sendRequest, id]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className='centered'>{error}</div>;
  }

  if (!loadedQuote.text) {
    return <p className='centered'>Quote not found!</p>;
  }

  return (
    <div>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={`${match.path}`} exact>
        <div className='centered'>
          <Link className='btn--flat' to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route exact path={`${match.path}/comments`}>
        <Comments quoteId={id} />
      </Route>
    </div>
  );
};

export default QuoteDetails;
