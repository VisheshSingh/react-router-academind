import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

const AllQuotes = React.lazy(() => import('./pages/AllQuotes'));
const NewQuote = React.lazy(() => import('./pages/NewQuote'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const QuoteDetails = React.lazy(() => import('./pages/QuoteDetails'));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className='centered'>
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path='/' exact>
            <Redirect to='/quotes' />
          </Route>
          <Route path='/quotes' component={AllQuotes} exact />
          <Route path='/quotes/:id' component={QuoteDetails} />
          <Route path='/new-quote' component={NewQuote} />
          <Route path='/*' component={NotFound} />
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
