import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import UserContext from "../contexts/UserContext";
import TokenContext from "../contexts/TokenContext";
import PorcentagemContext from "../contexts/PorcentagemContext";

import TelaLogin from './TelaLogin';
import TelaCadastro from './TelaCadastro';
import TelaHabitos from './TelaHabitos';
import TelaHoje from './TelaHoje';
import TelaHistorico from './TelaHistorico';

export default function App () {

    const imagemUsuarioLocal = (localStorage.getItem('imagem'))
    const porcentagemLocal = (localStorage.getItem('porcentagem'))

    const [imagemUsuario,setImagemUsuario] = React.useState(imagemUsuarioLocal);
    const [porcentagem, setPorcentagem] = React.useState(porcentagemLocal);
    const [token, setToken] = React.useState('');

    function setImagemUsuarioLocal(imagem) {
        setImagemUsuario(imagem)
        localStorage.setItem('imagem',imagem)
    }

    function setPorcentagemLocal(progresso) {
        setPorcentagem(progresso)
        localStorage.setItem('progresso',progresso)
    }

    return (
        <UserContext.Provider value={{imagemUsuario,setImagemUsuarioLocal}}>
            <TokenContext.Provider value={{token, setToken}}>
                <PorcentagemContext.Provider value={{porcentagem,setPorcentagemLocal}} >
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<TelaLogin />} />
                            <Route path="/cadastro" element={<TelaCadastro />} />
                            <Route path="/habitos" element={<TelaHabitos token={token} />} />
                            <Route path="/hoje" element={<TelaHoje token={token} />} />
                            <Route path="/historico" element={<TelaHistorico />} />
                        </Routes>
                    </BrowserRouter>
                </PorcentagemContext.Provider>
            </TokenContext.Provider>
        </UserContext.Provider>
    )
}