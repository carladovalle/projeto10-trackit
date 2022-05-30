import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import TokenContext from "../../contexts/TokenContext";
import PorcentagemContext from "../../contexts/PorcentagemContext";

export default function Menu() {

        const { token } = useContext(TokenContext);
        const { porcentagem,setPorcentagemLocal } = useContext(PorcentagemContext);
    
        useEffect(() => {
        
        const config = { 
            headers: {Authorization: `Bearer ${token}`}
        }

        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today',config)
        
        promise.then(resposta => {
            setPorcentagemLocal(((resposta.data.filter(habito => habito.done).length)/(resposta.data.length))*100)}          
        )}, [porcentagem])
          
    
    return (
        <BarraMenu>
            <Link to={"/habitos"}>
                <h1>Hábitos</h1>
            </Link>
            <Link to={"/hoje"}>
                <Circulo>
                    <CircularProgressbar
                        value={porcentagem}
                        text={"Hoje"}
                        background={true}
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: '#52B6FF',
                            textColor: '#FFFFFF',
                            trailColor: '#52B6FF',
                            pathColor: '#FFFFFF'
                        })}
                    />
                </Circulo>
            </Link>
            <Link to={"/historico"}>
                <h1>Histórico</h1>
            </Link>
        </BarraMenu>
    )
}

const BarraMenu = styled.div`
    background-color: #FFFFFF;
    width: 375px;
    height: 70px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;

    h1 {
        color: #52B6FF;
        font-size: 17.98px;
        font-weight: 400;
       
    }

    h2 {
        color: #FFFFFF;
        color: #52B6FF;
        font-size: 17.98px;
        font-weight: 400;
    }

    a:link {
        text-decoration: none;
    }
`
const Circulo = styled.div`
    width: 91px;
    height: 91px;
    margin-bottom: 40px;
`