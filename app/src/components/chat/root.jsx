import React, { useContext, useEffect, useState } from 'react';
import '../../style/chat/root.css'
import {UserContext} from '../../context/userContext'
import { useNavigate } from 'react-router-dom';
import {signOut} from 'firebase/auth';
import {auth, data, database} from '../../service/firebase-config'
import { push, ref } from 'firebase/database';
import Member from './member';
import MessageContent from './messageContent';
function Chat() {
  const [message, setMessage] = useState('');
  const [idMessage, setIdMessage] = useState('');
  const {currentUser} = useContext(UserContext);
  const [etat, setEtat] = useState(true)
  const navigate = useNavigate();
  useEffect(()=>{
    console.log(localStorage.getItem('idReceipt'));
  },[localStorage.getItem('idReceipt')])
  const handleSendMessage = () => {
    if (message.trim() !== '') {
      // Ajouter le nouveau message à la base de données
      const newMessage = {
        senderId: localStorage.getItem('idUser'),
        receiverId: localStorage.getItem('idReceipt'),
        content: message,
        timestamp: new Date().toISOString(),
      };

      push(ref(database, `chats/${generateChatId(localStorage.getItem('idUser'), localStorage.getItem('idReceipt'))}/messages`), newMessage);

      // Effacer le champ de message après l'envoi
      setMessage('');
    }
  };

  const generateChatId = (userId1, userId2) => {
    // Fonction pour générer l'identifiant unique du chat
    const sortedUserIds = [userId1, userId2].sort();
    return `${sortedUserIds[0]}_${sortedUserIds[1]}`;
  };
  
const deco = ()=>{
  signOut(auth);
  localStorage.removeItem('idUser');
  navigate('/')
}
  return (
    <>
    <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Nom</span>
          <button className="btn btn-outline-light" onClick={deco}>
            Déconnexion
          </button>
        </div>
      </nav>
      <section className="gradient-custom" style={{height: '100vh', margin: 'auto', alignContent: 'center', alignItems: 'center'}}>
  <div className="container" style={{margin: 'auto', padding: '75px'}}>

    <div className="row">

      <div className="col-md-6 col-lg-5 col-xl-5 mb-4 mb-md-0">

        <h5 className="font-weight-bold mb-3 text-center text-white">Discussion</h5>

        <div className="card mask-custom">
            <div className="card-header">
                <button onClick={()=>{setEtat(true)}}>
                    Personne
                </button>
                <span>/</span>
                <button onClick={()=>{setEtat(false)}}>
                    Group
                </button>
            </div>
          <div className="card-body">
            <Member />
            

          </div>
          {
            !etat ? <div className="card-footer">
            <button>
              Ajout nouvelle groupe
            </button>
          </div> : <></>
          }
          
        </div>

      </div>

      <div className="col-md-6 col-lg-7 col-xl-7">
  <ul className="list-unstyled text-white message" style={{ height: '65%', overflowY: 'auto' }}>
    <MessageContent />
    
  </ul>
  <li className="mb-3">
      <div className="form-outline form-white">
        <textarea value={message} onChange={(e) => { setMessage(e.target.value) }} className="form-control" id="textAreaExample3" rows="4"></textarea>
        <label className="form-label" htmlFor="textAreaExample3">Message</label>
      </div>
    </li>
  <button onClick={handleSendMessage} type="button" className="btn btn-light btn-lg btn-rounded float-end">Send</button>

</div>


    </div>

  </div>
</section>
    </>
    
  );
}

export default Chat;