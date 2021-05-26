import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AllQuotes from './pages/AllQuotes';
import NewQuote from './pages/NewQuote';
import NotFound from './pages/NotFound';
import QuoteDetails from './pages/QuoteDetails';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/quotes' />
        </Route>
        <Route path='/quotes' component={AllQuotes} exact />
        <Route path='/quotes/:id' component={QuoteDetails} />
        <Route path='/new-quote' component={NewQuote} />
        <Route path='/*' component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
