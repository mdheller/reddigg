import Head from 'next/head';
import { Grid } from 'react-bootstrap';

import Header from './Header';

export default props => (
  <div>
    <Head>
      <title>Reddigg</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
    </Head>
    <Grid>
      <Header />
      {props.children}
    </Grid>
  </div>
);
