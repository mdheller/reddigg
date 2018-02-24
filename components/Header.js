import { Button, Jumbotron } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

export default () => (
  <div>
    <Jumbotron>
      <h1>Reddigg</h1>
      <p>A Reddit/Digg clone by @indocomsoft, hence the portmanteau name!</p>
      <a href="https://github.com/indocomsoft/reddigg">
        <Button bsStyle="primary"><FontAwesome name="github" /> GitHub</Button>
      </a>
    </Jumbotron>
  </div>
);
