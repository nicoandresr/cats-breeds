import { Skeleton, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export interface SummaryCardPraps {
  stat: number;
  description: string;
  skeleton: boolean;
}

export function SummaryCard({ stat, description, skeleton }: SummaryCardPraps) {
  if (skeleton) return <Skeleton variant="rectangular" height={200} width="full" />;
  return (
    <Card sx={{ minHeight: 180 }}>
      <CardContent>
        <Typography variant="h2">{stat}</Typography>
        <Typography variant="h4" sx={{ mt: 1 }}>{description}</Typography>
      </CardContent>
    </Card>
  );
}
