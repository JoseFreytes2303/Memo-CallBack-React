import React from "react"

export const Incrementar = React.memo(({ incrementar }) => {
    return (
        <button className="btn btn-primary" onClick={() => incrementar(10)}>+10</button>
    )
}
)
