import styled from 'styled-components';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ThreeDots } from  'react-loader-spinner';

import ImagemLogo from "./../assets/imagens/logo.svg";

export default function TelaLogin({setToken}) {

    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    function erroLogin(erro) {
        alert("Erro")
    }

    function sucessoLogin(resposta) {
        navigate("/habitos")
    }

    function logar (event) {
        event.preventDefault();
        const body = {
            email,
            password,
        }
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body);
        promise
            .then(resposta => {
                setToken(resposta.data.token)
                sucessoLogin(resposta)
            })
            .catch(erro => {
                erroLogin(erro)
            });
    }

    return (
        <Tela>
                <ThreeDots color="rgba(255, 255, 255, 1)" height={13} width={51} />
                <Img src={ImagemLogo} />
                <form onSubmit={logar}>
                    <Dados>
                        <Input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        <Input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </Dados>
                    <Button type="submit">Entrar</Button>
                </form>
                <Link to={"/cadastro"}>
                    <IrParaCadastro>Não tem uma conta? Cadastre-se!</IrParaCadastro>
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