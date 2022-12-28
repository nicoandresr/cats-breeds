import * as React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Skeleton, Typography } from '@mui/material';
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  GridRowId,
  GridColumns,
} from '@mui/x-data-grid';
import { SummaryCard } from '../components/summary-card';
import Grid from '@mui/material/Unstable_Grid2';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PlaylistAdd from '@mui/icons-material/PlaylistAdd';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import { useForm, SubmitHandler } from 'react-hook-form';

interface ActionsType {
  handleEditClick: (id: GridRowId) => (e: unknown) => void;
  handleDeleteClick: (id: GridRowId) => (e: unknown) => void;
}

const actions = [{ icon: <PlaylistAdd />, name: 'Add cat' }];
const columns = ({
  handleEditClick,
  handleDeleteClick,
}: ActionsType): GridColumns => [
  { field: 'id', headerName: 'Id', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'breed', headerName: 'Breed', flex: 1 },
  { field: 'group', headerName: 'Group', flex: 1 },
  { field: 'weight', headerName: 'Weight', flex: 1 },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    flex: 1,
    getActions: ({ id }: { ['id']: GridRowId }) => {
      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ];
    },
  },
];

const FETCH_CAT_LIST = gql`
  query GetCats($skip: Float!, $take: Float!) {
    appControllerGetCats(skip: $skip, take: $take) {
      breed
      group
      id
      name
      weight
    }
  }
`;

const DELETE_CAT = gql`
  mutation DeleteCat($id: String!) {
    appControllerDeletePost(id: $id)
  }
`;

export interface Cat {
  id: string;
  name: string;
  breed: string;
  group: string;
  weight: string;
}

export function Cats() {
  const [open, setOpen] = React.useState(false);
  const [pageSize, setPageSize] = React.useState<number>(5);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<Cat>();
  const onSubmit: SubmitHandler<Cat> = (data) => alert("work in progress thank you for use my demo app");

  const { loading, error, data, refetch } = useQuery(FETCH_CAT_LIST, {
    variables: { skip: 0, take: pageSize },
  });
  const [deleteCatMutation] = useMutation(DELETE_CAT);

  if (error) return <p>Error : {error.message}</p>;

  const handleDeleteClick = (id: GridRowId) => () => {
    deleteCatMutation({ variables: { id } });
    refetch();
  };

  const handleEditClick = (id: GridRowId) => () => {
    setOpen(true);
    const [cat] = data.appControllerGetCats.filter((row: Cat) => row.id === id);
    setValue('name', cat.name);
    setValue('breed', cat.breed);
    setValue('group', cat.group);
    setValue('weight', cat.weight);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <main>
      <Typography variant="h1" sx={{ mt: '2rem' }}>
        {loading ? (
          <Skeleton variant="rectangular" width={210} height={118} />
        ) : (
          'Cat List'
        )}
      </Typography>

      <Grid container spacing={3} sx={{ mt: '2rem', mb: '2rem' }}>
        <Grid xs={3}>
          <SummaryCard
            stat={data?.appControllerGetCats?.length}
            description="Cats"
            skeleton={loading}
          />
        </Grid>
        <Grid xs={3}>
          <SummaryCard
            stat={
              data?.appControllerGetCats?.reduce((a: string[], c: Cat) => {
                if (!a.includes(c.group)) a.push(c.group);
                return a;
              }, []).length
            }
            description="Groups"
            skeleton={loading}
          />
        </Grid>
      </Grid>

      <div style={{ height: 400, width: '100%', marginTop: '2rem' }}>
        {loading ? (
          <Skeleton variant="rectangular" width="full" height={400} />
        ) : (
          <DataGrid
            rows={data.appControllerGetCats}
            columns={columns({ handleEditClick, handleDeleteClick })}
            initialState={{ pagination: { pageSize } }}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            components={{ Toolbar: GridToolbar }}
            rowsPerPageOptions={[5, 10, 20]}
          />
        )}
      </div>

      <SpeedDial
        ariaLabel="SpeedDial create a cat"
        sx={{ position: 'absolute', bottom: 16, right: 60 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => alert("wip, thank you for use my demo app")}
          />
        ))}
      </SpeedDial>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edid Cat Info</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText>
              To edit the cat info, please enter the new information here. We
              will update the changes.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              fullWidth
              variant="standard"
              {...register('name', { required: true })}
            />
            {errors.name && <span>This field is required</span>}
            <TextField
              autoFocus
              margin="dense"
              id="breed"
              label="Breed"
              fullWidth
              variant="standard"
              {...register('breed', { required: true })}
            />
            {errors.breed && <span>This field is required</span>}
            <TextField
              autoFocus
              margin="dense"
              id="group"
              label="Group"
              fullWidth
              variant="standard"
              {...register('group', { required: true })}
            />
            {errors.group && <span>This field is required</span>}
            <TextField
              autoFocus
              margin="dense"
              id="weight"
              label="Weight"
              fullWidth
              variant="standard"
              {...register('weight', { required: true })}
            />
            {errors.weight && <span>This field is required</span>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={!isValid} onClick={handleClose} type="submit">Update</Button>
          </DialogActions>
        </form>
      </Dialog>
    </main>
  );
}
