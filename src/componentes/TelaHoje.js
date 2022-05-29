import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import TokenContext from "../contexts/TokenContext";

import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

import Topo from './layouts/Topo'
import Menu from './layouts/Menu'


export default function TelaHoje() {
    return (
        <>
            <Topo />
            <Corpo>
                <DiaHoje>
                    <h1>{dayjs().locale('pt-br').format('dddd, DD/MM')}</h1>
                </DiaHoje>
                <Subtitulo>
                    <h2>Nenhum hábito concluído ainda</h2>
                </Subtitulo>
                <Habito>
                    <Dados>
                        <h3>Nome do hábito</h3>
                        <Informaçoes>
                            <h4>Sequencia atual: 3 dias</h4>
                            <h4>Seu recorde: 5 dias</h4>
                        </Informaçoes>
                    </Dados>
                    <Check>
                        
                    </Check>
                </Habito>
            </Corpo>
            <Menu />
        </>
    )
}

const Corpo = styled.div`
    width: 375px;
    height: 527px;
    background-color: #F2F2F2;
    margin-top: 70px;
`
const DiaHoje = styled.div`
    display: flex;
    justify-content: space-around;

    h1 {
        color: #126BA5;
        font-size: 22.98px;
        margin-left: 17px;
        margin-top: 28px;
        margin-bottom: 28px;
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
`
