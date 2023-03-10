import * as React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Skeleton, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { SummaryCard } from "../components/summary-card";
import Grid from '@mui/material/Unstable_Grid2';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', flex: 1 },
  { field: 'name', headerName: 'Breed', flex: 1 },
  { field: 'origin', headerName: 'Origin', flex: 1 },
  { field: 'temperament', headerName: 'Temperament', flex: 1 },
];

const GET_BREEDS = gql`
  query GetBreeds {
    breeds {
      id
      name
      origin
      temperament
    }
  }
`;

export interface Cat {
  id: string
  name: string
  origin: string
  temperament: string
}

export function Home() {
  const { loading, error, data } = useQuery(GET_BREEDS);
  const [pageSize, setPageSize] = React.useState<number>(5);

  if (error) return <p>Error : {error.message}</p>;

  return (
    <main>
      <Typography variant="h1" sx={{ mt: '2rem' }}>
        {loading ? (
          <Skeleton variant="rectangular" width={210} height={118} />
        ) : (
          'Cat Breeds'
        )}
      </Typography>

      <Grid container spacing={3} sx={{ mt: '2rem', mb: '2rem' }}>
        <Grid xs={3}>
          <SummaryCard stat={data?.breeds?.length} description="Breeds" skeleton={loading} />
        </Grid>
        <Grid xs={3}>
          <SummaryCard stat={data?.breeds?.reduce((a: string[], c: Cat) => {
            if(a.includes(c.origin)) return a;
            a.push(c.origin);
            return a;
          }, []).length} description="Origins" skeleton={loading} />
        </Grid>
      </Grid>

      <div style={{ height: 400, width: '100%', marginTop: '2rem' }}>
        {loading ? (
          <Skeleton variant="rectangular" width="full" height={400} />
        ) : (
          <DataGrid
            rows={data.breeds}
            columns={columns}
            initialState={{ pagination: { pageSize } }}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            components={{ Toolbar: GridToolbar }}
            rowsPerPageOptions={[5, 10, 20]}
          />
        )}
      </div>
    </main>
  );
}
