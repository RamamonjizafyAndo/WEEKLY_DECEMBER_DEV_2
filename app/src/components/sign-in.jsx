import React from 'react';
import '../style/sign-in.css'
import { useState, useContext } from 'react';
import {UserContext} from '../context/userContext'
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [mdp, setMdp] = useState('');
  const {SignIn, setIdUser, idUser} = useContext(UserContext)
  const onChangeEmail = (e)=>{
    setEmail(e.target.value);
  }
  const onChangeMdp = (e)=>{
    setMdp(e.target.value)
  }
  const onSubmitForm = async(e)=>{
    e.preventDefault();
    try{
      const cred = await SignIn(email, mdp);
      localStorage.setItem('idUser', cred.user.uid)
      navigate('/chat');
    } catch(err){
      console.log("baaaaaaaaaaa");
      navigate('/');
    }
    
  }
  return (
    <section className="vh-100 gradient-custom">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card ">
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4 pb-5">

              <h2 className="fw-bold mb-2 text-uppercase">Connexion</h2>
              <p className=" mb-5">Veuillez entrer votre email et mot de passe</p>
    <form onSubmit={onSubmitForm}>
    <div className="form-outline form-white mb-4">
                <input type="email" value={email} onChange={onChangeEmail} id="typeEmailX" className="form-control form-control-lg" />
                <label className="form-label" htmlFor="typeEmailX">Email</label>
              </div>

              <div className="form-outline form-white mb-4">
                <input type="password" value={mdp} onChange={onChangeMdp} id="typePasswordX" className="form-control form-control-lg" />
                <label className="form-label" htmlFor="typePasswordX">Mot de passe</label>
              </div>
              <button className="btn btn-outline-light btn-lg px-5" type="submit">Se connecter</button>
    </form>
              

              

            </div>

            <div>
              <p className="mb-0">Vous n'avez pas encore un compte?<a href="/sign-up" className="text-white-50 fw-bold">Inscription</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}

export default SignIn;