import React, { useState, useEffect } from 'react';
import { Footer, Navigation } from './index';
import PtProfile from './PtProfile';
import EditPT from '../Profile/EditPt';
import { getPt } from '../../util/pt';
import { STATUS_CODES } from '../../util/constants';

function PtProfilePage(props) {
  const [profile, setProfile] = useState();
  const [content, setContent] = useState(<h2>Loading...</h2>);

  const handleEditSubmit = (values) => {};

  const handleEdit = () => {};

  const handleViewRequests = () => {};

  useEffect(() => {
    const res = getPt(props.user.token);
    if (res.status === STATUS_CODES.OK) {
      setProfile(res.data);
      setContent(
        <>
          <PtProfile user={props.user} profile={profile} />
          <div>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleViewRequests}>
              View your client requests
            </button>
          </div>
        </>
      );
    } else if (res.status === STATUS_CODES.NOT_FOUND) {
      setContent(<EditPT handleEditSubmit={handleEditSubmit} />);
    } else {
      setContent(<h2>Internal Error! 😰</h2>);
    }
  }, [props.user, profile]);

  return (
    <>
      <Navigation {...props} />
      <div className='row content'>{content}</div>
      <Footer {...props} />
    </>
  );
}

export default PtProfilePage;
