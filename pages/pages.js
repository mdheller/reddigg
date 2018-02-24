import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import Layout from '../components/Layout';
import TopicTable from '../components/TopicTable';

const Pages = props => (
  <div>
    <Layout>
      <Link href="/"><a>Back to homepage</a></Link>
      <h1>
        <Link href={`/pages/${props.pageNo - 1}`}><a><FontAwesome name="arrow-left" /> </a></Link>
        Page {props.pageNo}
        <Link href={`/pages/${props.pageNo + 1}`}><a> <FontAwesome name="arrow-right" /></a></Link>
      </h1>
      <TopicTable topics={props.topics} />
    </Layout>
    <style jsx>{`
      a {
        text-decoration: none;
      }
    `}
    </style>
  </div>
);

Pages.getInitialProps = async ({ req, query }) => {
  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  const res = await fetch(`${baseUrl}/all`);
  const data = await res.json();
  // If page number not specified assume page 1
  let pageNo = query.pageNo !== undefined ? parseInt(query.pageNo, 10) : 1;
  // If page number is below 1, assume page, and if above maximum, assume maximum
  if (pageNo < 1) {
    pageNo = 1;
  } else if ((pageNo - 1) * 20 > data.topics.length) {
    pageNo = Math.ceil(data.topics.length / 20);
  }
  return { topics: data.topics.slice((pageNo - 1) * 20, pageNo * 20), pageNo };
};

// Pages.getInitialProps = async ({ query, req }) => {
//   const res = await fetch(`${baseUrl}/all}`);
//   const data = await res.json();
//   // If page number not specified, use assume page 1
//   const pageNo = query.pageNo ? parseInt(query.pageNo, 10) : 1;
//   return { topics: data.topics.slice(pageNo * 20, (pageNo * 20) + 20), pageNo };
// };

Pages.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired),
  pageNo: PropTypes.number,
};
Pages.defaultProps = {
  topics: [],
  pageNo: 1,
};

export default Pages;
