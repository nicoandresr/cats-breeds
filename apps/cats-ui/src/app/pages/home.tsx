import { useQuery, gql } from '@apollo/client';

const GET_BREEDS = gql`
  query GetBreeds {
    breeds(limit: 2) {
      id
      name
    }
  }
`;

export interface Cat {
  id: string;
  name: string;
}

export function Home() {
  const { loading, error, data } = useQuery(GET_BREEDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.breeds.map(({ id, name }: Cat) => (
    <div key={id}>
      <h3>{name}</h3>

      <br />
    </div>
  ));
}
