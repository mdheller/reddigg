import Layout from '../components/Layout.js';
import { Jumbotron } from 'react-bootstrap';

export default () => (
  <div>
    <Layout>
      <Jumbotron>
        <h1>Reddig</h1>
        <p>This is a Reddit/Digg clone, hence the portmanteau name!</p>
      </Jumbotron>
    </Layout>
  </div>
);
