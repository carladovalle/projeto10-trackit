import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Menu() {
    return (
        <BarraMenu>
            <Link to={"/habitos"}>
                <h1>Hábitos</h1>
            </Link>
            <Link to={"/hoje"}>
                <h2>Hoje</h2>
            </Link>
            <Link to={"/historico"}>
                <h1>Histórico</h1>
            </Link>
        </BarraMenu>
    )
}

const BarraMenu = styled.div`
    background-color: #FFFFFF;
    background-color: red;
    width: 375px;
    height: 70px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    h1 {
        color: #52B6FF;
        font-size: 17.98px;
        font-weight: 400;
       
    }

    h2 {
        color: #FFFFFF;
        font-size: 17.98px;
        font-weight: 400;
    }

    a:link {
        text-decoration: none;
    }
`