import Head from 'next/head';
import Header from './Header';
import { Grid } from 'react-bootstrap';

export default (props) => (
  <div>
    <Head>
      <title>Reddigg</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
    </Head>
    <Grid>
      {props.children}
    </Grid>
  </div>
);
