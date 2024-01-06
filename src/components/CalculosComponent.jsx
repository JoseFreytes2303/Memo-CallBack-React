import React, { useMemo, useState } from 'react'

export const CalculosComponent = () => {
    const [listaNumero, setListaNumero] = useState([2, 3, 4, 5, 6, 7, 8])
    const [show, setShow] = useState(true)
    const getCalculo = (listaNumero) => useMemo(() => {
        return listaNumero.reduce((a,b) => a * b )
    }, [listaNumero] )
    const agregarNumero = () => {
        setListaNumero([...listaNumero, listaNumero[listaNumero.length - 1 ] + 1 ])
    }
    return (
        <>
        <h2>Calculo: </h2>
        <p>{getCalculo(listaNumero)} </p>
        <button className='btn btn-primary' onClick={() => setShow(!show)}>{show ? 'Show' : "Hide"}</button> 
        <button className='btn btn-primary' onClick={() => agregarNumero()}>Agregar Número</button>
        </>
    )
}



