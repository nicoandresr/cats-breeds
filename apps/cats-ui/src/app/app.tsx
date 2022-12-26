import styled from '@emotion/styled';

import { Route, Routes, Link } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';

const StyledApp = styled.div`
  // Your style here
`;

const GET_BREEDS = gql`
  query GetBreeds {
    breeds(limit: 1) {
      id
      name
    }
  }
`;

export interface Cat {
  id: string
  name: string
}

export function App() {
  const { loading, error, data } = useQuery(GET_BREEDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <StyledApp>
      {data.breeds.map(({ id, name }: Cat) => (
        <div key={id}>
          <h3>{name}</h3>

          <br />

        </div>
      ))}

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </StyledApp>
  );
}

export default App;
