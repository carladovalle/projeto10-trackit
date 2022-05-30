import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import TokenContext from "../contexts/TokenContext";
import PorcentagemContext from "../contexts/PorcentagemContext";

import ImagemCheck from "./../assets/imagens/check.svg";

import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

import Topo from './layouts/Topo'
import Menu from './layouts/Menu'


export default function TelaHoje() {

    const { token } = useContext(TokenContext);
    const { setPorcentagemLocal, porcentagem } = useContext(PorcentagemContext);

    const [habitosHoje, setHabitosHoje] = useState([]);

    useEffect(() => renderizarHabitosHoje());

    function renderizarHabitosHoje() {

        const config = { 
            headers: {Authorization: `Bearer ${token}`}
        }
    
        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today',config)

        promise.then(resposta => {
            setHabitosHoje(resposta.data);
            setPorcentagemLocal(((resposta.data.filter(habito => habito.done).length)/(resposta.data.length))*100);
        })
    }

    function clicarHabito(done,id) {

        const config = { 
            headers: {Authorization: `Bearer ${token}`}
        }

        !done 
            ?
                axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,{},config)
                .then(() => {renderizarHabitosHoje()})
            :
                axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,{},config)
                .then(() => {renderizarHabitosHoje()})
            }

    return (
        <>
            <Topo />
            <Corpo>
                <DiaHoje>
                    <h1>{dayjs().locale('pt-br').format('dddd, DD/MM')}</h1>
                </DiaHoje>
                <>
                    <Subtitulo porcentagem={porcentagem}>
                    {(porcentagem) === 0 ? <h2>Nenhum hábito concluído ainda</h2> : <h2>{Math.floor(porcentagem)}% dos hábitos concluídos</h2>}
                    </Subtitulo>
                    {habitosHoje.map(habito =>
                    <Habito
                        key={habito.id}
                        feito={habito.done}
                        recorde={habito.highestSequence === habito.currentSequence && habito.done && habito.highestSequence !== 0}
                        >
                        <Dados>
                            <h3>{habito.name}</h3>
                            <Informaçoes>
                                <h4>Sequencia atual: {habito.currentSequence}</h4>
                                <h4>Seu recorde: {habito.highestSequence}</h4>
                            </Informaçoes>
                        </Dados>
                        <Check
                            feito={habito.done}
                            onClick={() => clicarHabito(habito.done,habito.id)}>
                                <img src={ImagemCheck} className="imagemCheck" />
                        </Check>
                    </Habito>)}
                </>
            </Corpo>
            <Menu porcentagem={porcentagem} />
        </>
    )
}

const Corpo = styled.div`
    width: 375px;
    height: 527px;
    background-color: #F2F2F2;
    margin-top: 70px;
    overflow-y: scroll;
`
const DiaHoje = styled.div`
    margin-left: 17px;
    margin-bottom: 2px;

    h1 {
        color: #126BA5;
        font-size: 22.98px;
        margin-top: 28px;
    }
`
const Subtitulo = styled.div`

    h2 {
        color: #BABABA;
        font-size: 17.98px;
        font-weight: 400;
        margin-left: 17px;
        margin-bottom: 28px;
    }
`
const Habito = styled.div`
    background-color: #FFFFFF;
    width: 340px;
    height: 94px;
    margin-left: 18px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-around;

`
const Dados = styled.div`

    h3 {
    color: #666666;
    font-size: 19.98px;
    margin-left: 15px;
    font-weight: 400;
    padding-top: 13px;
    margin-bottom: 7px;
}
`
const Informaçoes = styled.div`

    h4 {
            color: #666666;
            font-size: 12.98px;
            font-weight: 400;
            margin-left: 15px;
            margin-bottom: 2px;
    }
`
const Check = styled.div`
    width: 69px;
    height: 69px;
    background-color: #EBEBEB;
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    margin-left: 78px;
    margin-top: 13px;
    display: flex;
    justify-content: center;
    align-items: center;

    background: ${props => props.feito ? '#8FC549' : '#EBEBEB'};
`
const Texto = styled.div`
        color: #666666;
        font-size: 12.98px;
        font-weight: 400;
        margin-left: 15px;
        margin-bottom: 2px;
`