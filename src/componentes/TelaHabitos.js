import axios from 'axios';
import React, { useState, useEffect } from 'react';

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
            <h1>Habitos</h1>
            <Menu />
        </>
    )
}