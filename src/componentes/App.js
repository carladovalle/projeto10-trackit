import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import UserContext from "../contexts/UserContext";

import TelaLogin from './TelaLogin';
import TelaCadastro from './TelaCadastro';
import TelaHabitos from './TelaHabitos';
import TelaHoje from './TelaHoje';
import TelaHistorico from './TelaHistorico';

export default function App () {

    const imagemUsuarioLocal = (localStorage.getItem('imagem'))
    const [imagemUsuario,setImagemUsuario] = React.useState(imagemUsuarioLocal);
    const [token, setToken] = React.useState();

    function setImagemUsuarioLocal(imagem) {
        setImagemUsuario(imagem)
        localStorage.setItem('imagem',imagem)
    }

    return (
        <UserContext.Provider value={{imagemUsuario,setImagemUsuarioLocal}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TelaLogin setToken={setToken} />} />
                    <Route path="/cadastro" element={<TelaCadastro />} />
                    <Route path="/habitos" element={<TelaHabitos token={token} />} />
                    <Route path="/hoje" element={<TelaHoje />} />
                    <Route path="/historico" element={<TelaHistorico />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}