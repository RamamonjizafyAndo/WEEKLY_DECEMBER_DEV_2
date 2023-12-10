import React, { useRef } from 'react';
import '../style/sign-up.css'
import photo from '../assets/pdp.png'
import appareil from '../assets/appareil.png'
import { useState, useContext } from 'react';
import {UserContext} from '../context/userContext'
import { useNavigate } from 'react-router-dom';
import {getDownloadURL, ref, getBytes, uploadBytes} from 'firebase/storage'
import {imgDB, data} from '../service/firebase-config'
import { addDoc, collection } from 'firebase/firestore';
function SignUp() {
    const navigate = useNavigate();
    const {SignUp} = useContext(UserContext);
    const [pdp, setPdp] = useState(photo)
    const imageRef = useRef(photo);
    const [image, setImage] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [mdp, setMdp] = useState('');
    const [confMdp, setConfMdp] = useState('');
    
    const onChangePseudo = (e) =>{
        setPseudo(e.target.value)
        console.log(pseudo);
    }
    const onChangeEmail = (e)=>{
        setEmail(e.target.value)
    }
    const onChangeMdp = (e)=>{
        setMdp(e.target.value)
    }
    const onChangeConfMdp = (e)=>{
        setConfMdp(e.target.value)
    }
    

    const onChangeImg = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPdp(reader.result);
            };

            reader.readAsDataURL(file);
            imageRef.current = file;
        }
    }
    

    const onSubmitForm = async(e) =>{
        e.preventDefault();
        try{
            const cred = await SignUp(email, mdp);
            console.log(cred.user.uid);
            const id_user = cred.user.uid;
            const img = ref(imgDB, `Pdp/${id_user}`);
            await uploadBytes(img, imageRef.current);

            const imgUrl = await getDownloadURL(img);
            const userRef = collection(data, 'user');
            await addDoc(userRef, {
                id:id_user,
                pseudo: pseudo,
                photo: imgUrl
            })
            navigate('/');
        }catch(err){
            console.log(err);
        }
    }
    return (
        <section className="vh-100 bg-image">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{ borderRadius: "15px;" }}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Créer un compte</h2>

                                    <form onSubmit={onSubmitForm}>
                                        <div className="form-outline mb-4 custom-file-input">
                                            <input type="file" value={image} onChange={onChangeImg} name='image' id="form3Example1cg" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="form3Example1cg">
                                                <img src={pdp} alt="Tête" className="head-icon" />
                                                Votre photo de profil
                                            </label>

                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="text" value={pseudo} onChange={onChangePseudo} name='pseudo' id="form3Example1cg" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="form3Example1cg">Votre pseudo</label>
                                        </div>



                                        <div className="form-outline mb-4">
                                            <input type="email" value={email} onChange={onChangeEmail} name='email' id="form3Example3cg" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="form3Example3cg">Votre Email</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="password" value={mdp} onChange={onChangeMdp} name='mdp' id="form3Example4cg" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="form3Example4cg">Mot de passe</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="password" value={confMdp} onChange={onChangeConfMdp} name='confMdp' id="form3Example4cdg" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="form3Example4cdg">Confirmer votre mot de passe</label>
                                        </div>

                                        <div className="d-flex justify-content-center">
                                            <button type="submit"
                                                className="btn btn-outline-light btn-lg px-5">S'inscrir</button>
                                        </div>

                                        <p className="text-center text-muted mt-5 mb-0">Vous avez déja un compte? <a href="/"
                                            className="fw-bold text-body"><u>Connexion</u></a></p>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp