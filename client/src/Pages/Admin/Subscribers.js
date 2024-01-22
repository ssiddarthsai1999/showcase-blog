import React from 'react'
import AllPostsTable from '../../Components/Admin/AllPostsTable';
import SubscribersTable from '../../Components/Admin/SubscribersTable';

function Subscribers() {
  return (
      <div className="max-w-7xl mx-auto justify-center align-middle items-center  w-full pt-[100px] ">
          <h1 className="text-center mb-10">Subscribers</h1>
          <SubscribersTable />
      </div>
  );
}

export default Subscribers