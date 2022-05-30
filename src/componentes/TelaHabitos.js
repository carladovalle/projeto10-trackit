import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ThreeDots } from  'react-loader-spinner';

import TokenContext from "../contexts/TokenContext";
import PorcentagemContext from "../contexts/PorcentagemContext";

import ImagemDelete from "./../assets/imagens/delete.svg";

import Topo from './layouts/Topo'
import Menu from './layouts/Menu'

export default function TelaHabitos() {

    const { setPorcentagemLocal } = useContext(PorcentagemContext)
    const { token } = useContext(TokenContext);
    const { porcentagem } = useContext(PorcentagemContext);

    const [habito, setHabito] = useState("");
    const [dias, setDias] = useState([
        {dia:"D", diaId:0, selecionado: false},
        {dia:"S", diaId:1, selecionado: false},
        {dia:"T", diaId:2, selecionado: false},
        {dia:"Q", diaId:3, selecionado: false},
        {dia:"Q", diaId:4, selecionado: false},
        {dia:"S", diaId:5, selecionado: false},
        {dia:"S", diaId:6, selecionado: false},
    ])
    const [adicionarHabito, setAdicionarHabito] = useState(false);
    const [listaHabitos, setListaHabitos] = useState([]);
    const [botao, setBotao] = useState(true);
    const [input, setInput] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => renderizarHabitos())

    function renderizarHabitos() {

        const config = { 
            headers: {Authorization: `Bearer ${token}`}
        }

        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",config);

        promise
            .then(res => {
                setListaHabitos(res.data);
            })
            .catch(resposta => {
                console.log("erro")
            })
    }

    function selecionarDia(diaId, diaSelecionado) {

        const objetoDias = [...dias]

        if (diaSelecionado === false) {
            objetoDias[diaId].selecionado = true;
        } else {
            objetoDias[diaId].selecionado = false;
        }

        setDias(objetoDias);
    }

    function limparDias() {
        setDias([
            {dia:"D", diaId:0, selecionado: false},
            {dia:"S", diaId:1, selecionado: false},
            {dia:"T", diaId:2, selecionado: false},
            {dia:"Q", diaId:3, selecionado: false},
            {dia:"Q", diaId:4, selecionado: false},
            {dia:"S", diaId:5, selecionado: false},
            {dia:"S", diaId:6, selecionado: false},
        ])
    }

    function cancelar() {
        setHabito('');
        setAdicionarHabito(false);
        limparDias();
    }

    function salvarHabito() {

        const diasSelecionados = [];
        setBotao(false);
        setInput(false);

        dias.filter(dia => dia.selecionado)
            .map(dia => diasSelecionados.push(dia.diaId));

        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }

        const body = {
            name: habito,
            days: diasSelecionados,
        }

        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',body,config)

        promise.then(() => {
                renderizarHabitos();
                setAdicionarHabito(false);
                setHabito('');
                limparDias();
                setBotao(true);
                setInput(true);
                setPorcentagemLocal(0)
            })
    }

    function deletar(id) {

        const config = { 
            headers: {Authorization: `Bearer ${token}`}
        }

        const resposta = window.confirm("Tem certeza que deseja excluir?");

        if(resposta) {
            axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config)
            .then(() => {renderizarHabitos();setPorcentagemLocal(0)})
        }
    }

    return (
        <>
            <Topo/>
            <Corpo>
                <Subtitulo>
                    <h1>Meus hábitos</h1>
                    <Button onClick={() => setAdicionarHabito(true)}><h2>+</h2></Button>
                </Subtitulo>
                <Desenvolvimento>
                    {adicionarHabito &&
                    <FormCadastroHabito>
                        <Input ativo={input} type="text" placeholder="nome do hábito" name="habito" value={habito} onChange={e => setHabito(e.target.value)} />
                        <Semana>
                            {dias.map(dia => 
                                <Dia
                                selecionado={dia.selecionado}
                                dia={dia.dia}
                                idDia={dia.diaId}
                                key={dia.diaId}
                                onClick={() => selecionarDia(dia.diaId, dia.selecionado)}>
                                    <h5>{dia.dia}</h5>
                                </Dia>
                            )}
                        </Semana>
                        <Decisão>
                            <Cancelar onClick={() => cancelar()}>Cancelar</Cancelar>
                            <ButtonSalvar onClick={() => salvarHabito()}>
                                {
                                    botao ? <h4>Salvar</h4>
                                    :
                                    <ThreeDots
                                    color="#FFFFFF" 
                                    height={30} width={30} 
                                    />
                                }
                                
                            </ButtonSalvar>    
                        </Decisão>
                    </FormCadastroHabito>}
                    {isLoading.length ? "Carregando"
                    :
                    (listaHabitos.length === 0 ?
                        <Texto>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Texto>
                        :
                        listaHabitos.map(habito => 
                            <FormCadastroHabito key={habito.id}>
                                <div className="topoHabitoPronto">
                                    <h3>{habito.name}</h3>
                                    <img className="botaoDelete" onClick={() => deletar(habito.id)} src={ImagemDelete} />
                                </div>
                                <Semana>
                                    {dias.map(dia =>
                                        <Dia
                                            selecionado={habito.days.includes(dia.diaId)}
                                            diaId={dia.diaId}
                                            key={dia.diaId}
                                        >
                                            {dia.dia}
                                        </Dia>  
                                        )}
                                </Semana>
                            </FormCadastroHabito>
                            )
                        )
                    }
                </Desenvolvimento>
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
    cursor: pointer;

    h2 {
        color: #FFFFFF;
        font-weight: 400;
    }
`
const Desenvolvimento = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    overflow-y: scroll;
`
const Cancelar = styled.div`
        color: #666666;
        font-size: 17.98px;
        font-weight: 400;
        margin-left: 45px;
        margin-top: 36px;
`
const FormCadastroHabito = styled.div`
    margin-left: 17px;
    margin-bottom: 29px;
    background-color: #FFFFFF;
    width: 340px;
    height: 180px;
    border-radius: 5px;

    .topoHabitoPronto {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .botaoDelete {
        margin-top: 11px;
        margin-right: 10px;
    }

    h3 {
        color: #666666;
        font-size: 19.98px;
        font-weight: 400;
        margin-left: 15px;
        margin-top: 13px;
}
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
const Semana = styled.div`
    margin-left: 19px;
`
const Dia = styled.button`
    width: 30px;
    height: 30px;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    margin-top: 10px;
    margin-left: 4px;
    background-color: #FFFFFF;

    background: ${props => props.selecionado ? '#CFCFCF' : '#FFFFFF'};
    color: ${props => props.selecionado ? '#FFFFFF' : '#DBDBDB'};

    h5 {
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
    cursor: pointer;

    h4 {
        color: #FFFFFF;
        font-size: 15.98px;
        font-weight: 400;
    }
`
const Texto = styled.div`
    color: #666666;
    margin-left: 19px;
    font-weight: 400;
    font-size: 17.98px;
`