import React from 'react';
import { NextPageContext} from 'next';
import IndexContainer from '../containers/homepage';

const IndexPage = () => <IndexContainer testString={'qqwertyuio'} />;

IndexPage.getInitialProps = (props: NextPageContext) => {
  // props.ctx.store
};

export default IndexPage;
