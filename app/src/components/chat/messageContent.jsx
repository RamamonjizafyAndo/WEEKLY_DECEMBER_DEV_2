import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/userContext"
import { ref, push, onValue } from 'firebase/database';
import {database} from '../../service/firebase-config';


function MessageContent(){
  const {currentUser} = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if(localStorage.getItem('idUser')){
      const chatRef = ref(database, `chats/${generateChatId(localStorage.getItem('idUser'), localStorage.getItem('idReceipt'))}/messages`);
  
    const handleNewMessage = (snapshot) => {
      if (snapshot.val()) {
        const messagesData = Object.values(snapshot.val());
        setMessages(messagesData);
        console.log(messagesData); // Utilisez messagesData au lieu de messages ici
      }
    };
  
    onValue(chatRef, handleNewMessage);
    }
    
    
  }, [localStorage.getItem('idUser'), localStorage.getItem('idReceipt')]);
  
  const generateChatId = (userId1, userId2) => {
    // Fonction pour générer l'identifiant unique du chat
    const sortedUserIds = [userId1, userId2].sort();
    return `${sortedUserIds[0]}_${sortedUserIds[1]}`;
  };
    return(
        <div>
        {messages && messages.map((item) => (
  item.senderId === localStorage.getItem('idUser') ? 
    <li className="d-flex justify-content-between mb-4" key={item.messageId}>
      <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" alt="avatar"
        className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60" />
      <div className="card mask-custom">
        <div className="card-header d-flex justify-content-between p-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,.3);" }}>
          <p className="fw-bold mb-0">Brad Pitt</p>
          <p className="text-light small mb-0"><i className="far fa-clock"></i> 12 mins ago</p>
        </div>
        <div className="card-body">
          <p className="mb-0">
            {item.content}
          </p>
        </div>
      </div>
    </li> :
    <li className="d-flex justify-content-between mb-4" key={item.messageId}>
      <div className="card mask-custom w-100">
        <div className="card-header d-flex justify-content-between p-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,.3);" }}>
          <p className="fw-bold mb-0">Lara Croft</p>
          <p className="text-light small mb-0"><i className="far fa-clock"></i> 13 mins ago</p>
        </div>
        <div className="card-body">
          <p className="mb-0">
            {item.content}
          </p>
        </div>
      </div>
      <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp" alt="avatar"
        className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="60" />
    </li>
))}

            
          
        </div>
    )
}

export default MessageContent