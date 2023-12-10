import React, { useContext, useEffect, useState } from 'react';
import '../../style/chat/root.css';
import { getDocs, collection } from 'firebase/firestore';
import { data } from '../../service/firebase-config';
import { UserContext } from '../../context/userContext';

function Member() {
  const { currentUser } = useContext(UserContext);
  const userRef = collection(data, 'user');
  const [user, setUser] = useState([]);

  const getUsers = async () => {
    const userData = [];
    const querySnapshot = await getDocs(userRef);
    querySnapshot.forEach((doc) => {
      if(localStorage.getItem('idUser') != doc.data().id){
        userData.push(doc.data());
      }
      
    });
    setUser(userData);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUsers();
    };
    fetchData();
  }, []);

  const memberChoose = (id) => {
    console.log('clique');
    if (localStorage.getItem('idReceipt')) {
      localStorage.removeItem('idReceipt');
    }
    localStorage.setItem('idReceipt', id);
  };

  return (
    <>
      <ul className="list-unstyled mb-0">
        {user &&
          user.map((item) => (
            <li
              key={item.id}
              className="p-2 border-bottom"
              style={{ borderBottom: "1px solid rgba(255,255,255,.3) !important;" }}
            >
              <a href="#" className="d-flex justify-content-between link-light" onClick={() => memberChoose(item.id)}>
                <div className="d-flex flex-row">
                  <img
                    src={item.photo}
                    alt="avatar"
                    className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                    width="60"
                  />
                  <div className="pt-1">
                    <p className="fw-bold mb-0">{item.pseudo}</p>
                    <p className="small text-white">Hello, Are you there?</p>
                  </div>
                </div>
                <div className="pt-1">
                  <p className="small text-white mb-1">Just now</p>
                  <span className="badge bg-danger float-end">1</span>
                </div>
              </a>
            </li>
          ))}
      </ul>
    </>
  );
}

export default Member;
