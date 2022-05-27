import styled from 'styled-components';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ImagemLogo from "./../assets/imagens/logo.svg";

export default function TelaCadastro() {

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [picture,setPicture] = useState("");
    const [password,setPassword] = useState("");

    function erroCadastro(erro) {
        alert("Erro")
    }

    function cadastrar (event) {

        event.preventDefault();
        const body = {
            email,
            name,
            image: picture,
            password,
        }
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body);
        promise
            .then(() => navigate("/"))
            .catch(erro => erroCadastro(erro))

    }

    return (
        <Tela>
                <Img src={ImagemLogo} />
                <form onSubmit={cadastrar}>
                    <Dados>
                        <Input type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                        <Input type="password" placeholder="senha" value={password} onChange={e => setPassword(e.target.value)} />
                        <Input type="text" placeholder="nome" value={name} onChange={e => setName(e.target.value)} />
                        <Input type="text" placeholder="foto" value={picture} onChange={e => setPicture(e.target.value)} />
                    </Dados>
                    <Button type="submit">Cadastrar</Button>
                </form>
                <Link to={"/"}>
                    <IrParaCadastro>Já tem uma conta? Faça login!</IrParaCadastro>
                </Link>
        </Tela>
    )
}

const Tela = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: red;
    height: 667px;
`;

const Img = styled.img`
    width: 180px;
    height: 178.38px;
    margin-left: 97px;
`;

const Dados = styled.div`
    margin-top: 32.62px;
    margin-left: 36px;
`

const Input = styled.input`
    width: 303px;
    height: 45px;
    margin-bottom: 6px;
    border: 1px solid #D4D4D4;
    border-radius: 5px;

    &:placeholder {
        color: #DBDBDB;
        font-size: 19.98px;
        font-weight: 400;
    }
`
const Button = styled.button`
    background-color: #52B6FF;
    width: 303px;
    height: 45px;
    border-radius: 4,64px;
    margin-left: 36px;
    font-size: 20.98px;
    font-weight: 400;
    color: #FFFFFF;
`
const IrParaCadastro = styled.div`
    font-size: 13.98px;
    color: #52B6FF;
    text-decoration-line: underline;
    margin-left: 74px;
    margin-top: 25px;
`