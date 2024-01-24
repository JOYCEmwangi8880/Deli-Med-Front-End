import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/users/${id}`)
    .then ((res) => res.json())
    .then((data) => setData(data))
  }, [id]);

  return (
    <div>
      {data && (
        <div>
          <p>{data.id}</p>
          <p>{data.username}</p>
          <p>{data.email}</p>
          <p>{data.name}</p>
          <p>{data.age}</p>
          <p>{data.height}</p>
          <p>{data.blood_type}</p>
          <p>{data.previous_illnesses}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;