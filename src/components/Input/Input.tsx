import { KeyboardEvent } from 'react'
import Search from 'src/assets/search.svg'

import './Input.css'

interface InputProps {
  value: string
  loading: boolean
  disabled: boolean
  onSearch: () => void
  onChange: (value: string) => void
}

export const Input = ({ value, loading, disabled, onSearch, onChange }: InputProps) => {

  const handleEnterSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') onSearch()
  }

  return (
    <div className='input-wrapper'>
      <input
        disabled={disabled}
        type='text'
        value={value}
        placeholder='Buscar'
        onKeyDown={handleEnterSearch}
        onChange={(value) => onChange(value.target.value)}
        style={disabled ? { cursor: 'progress' } : {}}
      />

      <button className='icon-container' onClick={onSearch}>
        {loading ? (
          <div className='loader' />
        ) : (
          <img alt="Ícone busca" src={Search} />
        )}
      </button>
    </div>
  )
}
