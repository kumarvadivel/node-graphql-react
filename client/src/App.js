import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import BookList from './components/BookList';
import AddMovie from './components/AddMovie';

const client = new ApolloClient({
  uri: 'http://localhost:2000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      
    <div className="App">
      <h1>Movies Archive</h1>
      <BookList/>
      <AddMovie/>
    </div>
    </ApolloProvider>
  );
}

export default App;
