import React from 'react';
import withAuthorization from '../../withAuthorization';

import TagList from '../../components/TagList';

const AllTags = ({ match }) => {
  const tagName = match.params.tagName || '';
  return (
    <article className="app grid app-content">
      <main className="app__main grid__col-sm-12">
        <TagList tagName={tagName} />
      </main>
    </article>
  );
};

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AllTags);
