import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Topo from './layouts/Topo'
import Menu from './layouts/Menu'

export default function TelaHabitos({token}) {

    console.log(token);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        console.log(config)
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",config)
        promise.then(res => {
            console.log(res.data);
        })
    })

    return (
        <>
            <Topo />
            <Corpo>
                <Subtitulo>
                    <h1>Meus hábitos</h1>
                    <Button><h2>+</h2></Button>
                </Subtitulo>
                <Desenvolvimento>
                    <FormCadastroHabito>
                        <Input type="text" placeholder="nome do hábito" />
                        <InputDia type="checkbox" placeholder="D" />
                        <InputDia type="checkbox" placeholder="S" />
                        <InputDia type="checkbox" placeholder="T" />
                        <InputDia type="checkbox" placeholder="Q" />
                        <InputDia type="checkbox" placeholder="Q" />
                        <InputDia type="checkbox" placeholder="S" />
                        <InputDia type="checkbox" placeholder="S" />
                        <Decisão>
                            <h3>Cancelar</h3>
                            <ButtonSalvar><h4>Salvar</h4></ButtonSalvar>    
                        </Decisão>
                    </FormCadastroHabito>
                    <h3>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h3>
                </Desenvolvimento>
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
const Subtitulo = styled.div`
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
const Button = styled.button`
    background-color: #52B6FF;
    border-radius: 4.64px;
    width: 40px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 21px;

    h2 {
        color: #FFFFFF;
        font-weight: 400;
    }
`
const Desenvolvimento = styled.div`
        display: flex;
        justify-content: center;
        flex-direction: column;

    h3 {
        color: #666666;
        font-size: 17.98px;
        font-weight: 400;
        margin-left: 19px;
    }
`
const FormCadastroHabito = styled.div`
    margin-left: 17px;
    margin-bottom: 29px;
    background-color: #FFFFFF;
    width: 340px;
    height: 180px;
    border-radius: 5px;
`
const Input = styled.input`
    margin-top: 18px;
    margin-left: 19px;
    width: 303px;
    height: 45px;
    border: 1px solid #D4D4D4;
    border-radius: 5px;

    &::placeholder {
        margin-left: 11px;
        font-size: 19.98px;
        font-weight: 400;
        color: #DBDBDB;
    }
`
const InputDia = styled.input`
    width: 30px;
    height: 30px;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    margin-top: 10px;
    margin-left: 13px;

    &::placeholder {
        color: #DBDBDB;
        font-size: 19.98px;
        font-weight: 400;
    }
`
const Decisão = styled.div`
    display: flex;
    justify-content: center;

    h3 {
        color: #52B6FF;
        font-size: 15.98px;
        font-weight: 400;
        margin-left: 148px;
        margin-top: 36px;
    }
`
const ButtonSalvar = styled.button`
    background-color: #52B6FF;
    width: 84px;
    height: 35px;
    border-radius: 4.64px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 15px;
    margin-top: 29px;

    h4 {
        color: #FFFFFF;
        font-size: 15.98px;
        font-weight: 400;
    }
`