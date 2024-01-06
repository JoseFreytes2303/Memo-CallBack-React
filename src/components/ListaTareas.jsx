import React, { useReducer } from 'react'
import { useForm} from "../hooks/useForm"

const initialState = [{
    id: new Date().getTime,
    tarea: 'Estudiar',
    finalizada: false
}]

const tareaReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case '[TAREA] Agregar Tarea':
            return [...state, action.payload]
        case '[TAREA] Finalizar Tarea':
            return state.map(tarea => {
                if (tarea.id === action.payload) {
                    return {
                        ...tarea,
                        finalizada: !tarea.finalizada
                    }
                } return tarea
            })
        case '[TAREA] Eliminar Tarea':
            return state.filter(tarea => tarea.id !== action.payload)
        case '[TAREA] Borrar Tareas':
            return action.payload
        default:
            return state
    }
}
export const ListaTareas = () => {
    const [tareaState, dispatch] = useReducer(tareaReducer, initialState)
    const { tarea, formState, onInputChange } = useForm({ tarea: '' })

    const agregarTarea = (event) => {
        event.preventDefault()
        if (formState.tarea == '') return
        const tarea = {
            id: new Date().getTime(),
            tarea: formState.tarea,
            finalizada: false
        }
        const action = {
            type: '[TAREA] Agregar Tarea',
            payload: tarea
        }
        dispatch(action)
    }

    const finalizarTarea = ({ id }) => {
        const action = {
            type: '[TAREA] Finalizar Tarea',
            payload: id
        }
        dispatch(action)
    }

    const elimiarTarea = ({ id }) => {
        const action = {
            type: '[TAREA] Eliminar Tarea',
            payload: id
        }
        dispatch(action)
    }
    const reset = () => {
        const action = {
            type: '[TAREA] Borrar Tareas',
            payload: []
        }
        dispatch(action)
    }
    return (
        <>
            <form onSubmit={agregarTarea}>
                <div className='form-gropu'>
                    <input
                        type="text"
                        className='form-control'
                        name="tarea"
                        placeholder='Ingresa Tarea'
                        value={tarea}
                        onChange={onInputChange}
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Subir</button>
                <button type='button' className='btn btn-danger' onClick={reset}>Reset</button>

            </form>
            <hr />
            <ul className='list-gropu'>
                {tareaState.map(item => {
                    return (
                        <li key={item.id} className='list-group-item d-flex justify-content-between'>
                            <span>{item.tarea}</span>
                            <div>
                                <input
                                    type="checkbox"
                                    value={item.finalizada}
                                    onChange={() => finalizarTarea(item)}
                                />
                                <button className='btn btn-danger'
                                    onClick={() => elimiarTarea(item)}
                                >
                                    Borrar
                                </button>
                            </div>

                        </li>


                    )
                })}
            </ul>
        </>
    )

}
