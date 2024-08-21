
import React from 'react'

import { Character } from 'src/api/MarvelApi.types'

import './Table.css'

interface TableProps {
  data: Array<Character>
  handleModal: (characterId: string) => void
}

export const Table = React.memo(({ data, handleModal }: TableProps) => {
  return (
    <div className="table-container">
      <table className="table" cellSpacing={0}>
        <thead>
          <tr>
            <th>Personagem</th>
            <th>Séries</th>
            <th>Eventos</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td></td>
              <td>
                <div className='empty'>
                  <span>Nenhum personagem encontrado</span>
                </div>
              </td>
              <td></td>
            </tr>
          ) : (
            data.map((character) => (
              <tr key={character.id} onClick={() => handleModal(character.id)}>
                <td>
                  <div className='character'>
                    <img alt={character.name} src={character.thumbnail.path + '.' +  character.thumbnail.extension} />
                    <span>{character.name}</span>
                  </div>
                </td>
                <td>
                  <div className='hidden'>
                    {character.series.items.map((item, index) => {
                      if (index > 3) return (
                        <span key={item.name} style={{ lineHeight: 1.5 }}>&#8230;</span>
                      )

                      return (
                        <span key={item.name} style={{ lineHeight: 1.5 }}>{item.name}</span>
                      )
                    })}
                  </div>
                </td>
                <td>
                  <div className='hidden'>
                    {character.events.items.map((item, index) => {
                      if (index > 3) return (
                        <span key={item.name} style={{ lineHeight: 1.5 }}>&#8230;</span>
                      )

                      return (
                        <span key={item.name} style={{ lineHeight: 1.5 }}>{item.name}</span>
                      )
                    })}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  ) 
})
