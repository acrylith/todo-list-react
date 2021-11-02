import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Context from '../context'

function TodoItem({todo, index, onChange}) {
    let {removeTodo} = useContext(Context)
    let classess = [];
    if(todo.completed) {
        classess.push('done')
    }

    return(
        <li className={classess.join(' ')}>
            <input type="checkbox" checked={todo.completed} onChange={() => onChange(todo.id)}/>
            <strong>{index + 1}</strong>
            <p>{todo.title}</p>
            <div className="button-wrapper">
                <button className="delButton" onClick={() => removeTodo(todo.id)}>&times;</button>
            </div>
        </li>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.arrayOf(PropTypes.object).isRequired,
    index: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

export default TodoItem