import styled from 'styled-components';
import React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ThreeDots } from  'react-loader-spinner';

import UserContext from "../contexts/UserContext";
import TokenContext from "../contexts/TokenContext";

import ImagemLogo from "./../assets/imagens/logo.svg";

export default function TelaLogin() {

    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const { setImagemUsuarioLocal } = useContext(UserContext);
    const { token, setToken } = useContext(TokenContext);

    function erroLogin(erro) {
        alert("Erro")
    }

    function sucessoLogin(resposta) {
        navigate("/hoje")
        setImagemUsuarioLocal(resposta.data.image)
    }

    function logar (event) {
        event.preventDefault();
        const body = {
            email,
            password,
        }
        setIsDisabled(true);
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body);
        promise
            .then(resposta => {
                setToken(resposta.data.token)
                console.log(resposta.data.token)
                sucessoLogin(resposta)
            })
            .catch(erro => {
                erroLogin(erro)
                setIsDisabled(false)
            });
    }

    return (

        <Tela>
                <Img src={ImagemLogo} />
                <form onSubmit={logar}>
                    <Dados>
                        <Input type="email" disabled={isDisabled} placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        <Input type="password" disabled={isDisabled} placeholder="senha" value={password} onChange={e => setPassword(e.target.value)} required />
                    </Dados>
                    <Button type="submit" disabled={isDisabled}>
                        {isDisabled
                            ? <ThreeDots color="rgba(255, 255, 255, 1)" height={13} width={51} />
                            : "Entrar"}
                    </Button>
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
    background-color: #F2F2F2;
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

    &::placeholder {
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
    display: flex;
    justify-content: center;
    align-items: center;
`
const IrParaCadastro = styled.div`
    font-size: 13.98px;
    color: #52B6FF;
    text-decoration-line: underline;
    margin-left: 74px;
    margin-top: 25px;
`