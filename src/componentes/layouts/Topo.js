import { useContext } from 'react';
import styled from 'styled-components';

import UserContext from "../../contexts/UserContext";

export default function Topo() {

    const { imagemUsuario } = useContext(UserContext);

    return (
        <Tela>
            <h1>Trackit</h1>
            <ImagemUsuario src={imagemUsuario}></ImagemUsuario>
        </Tela>
    )
}

const Tela = styled.div`
    background-color: #126BA5;
    width: 375px;
    height: 70px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;

    h1 {
        color: #FFFFFF;
        font-size: 38.98px;
        font-weight: 400;
        font-family: 'Playball', cursive;
    }
`
const ImagemUsuario = styled.img`
    width: 51px;
    height: 51px;
    border-radius: 98.5px;
`