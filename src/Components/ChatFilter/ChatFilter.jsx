import React, { useContext } from 'react'
import { HomeContactContext } from '../../Context/HomeContactContext'
import './ChatFilter.css'

export default function ChatFilter() {
    const { filter, setFilter } = useContext(HomeContactContext)

    const buttons = [
        { id: 'todos', label: 'Todos' },
        { id: 'no-leidos', label: 'No leídos' },
        { id: 'favoritos', label: 'Favoritos' },
        { id: 'grupos', label: 'Grupos' },
    ]

    return (
        <div className="filter-buttons">
            {buttons.map(({ id, label }) => (
                <button
                key={id}
                className={`filter-btn ${filter === id ? 'active' : ''}`}
                onClick={() => setFilter(id)}
                >
                {label}
                </button>
            ))}
        </div>
    )
}