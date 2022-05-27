import styled from 'styled-components';

import Topo from './layouts/Topo'
import Menu from './layouts/Menu'

export default function TelaHistorico() {
    return (
        <>
            <Topo />
            <Corpo>
                <Subtitulo>
                    <h1>Histórico</h1>
                </Subtitulo>
                <Desenvolvimento>
                    <h3>Em breve você poderá ver o histórico dos seus hábitos aqui!</h3>
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
    align-items: center;
    height: 57px;
    width: 375px;

    h1 {
        color: #126BA5;
        font-size: 22.98px;
        margin-left: 17px;
        margin-bottom: 28px;
        margin-top: 17px;
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
        margin-left: 15px;
    }
`