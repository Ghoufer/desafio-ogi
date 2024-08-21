import { useEffect, useState } from "react";

import { Table } from "src/components/Table";
import { Input } from "src/components/Input";
import { Pagination } from "src/components/Pagination/Pagination";

import ObjectiveLogo from 'src/assets/objective_logo.svg'

import "./Home.css"
import { Character } from "src/api/MarvelApi.types";
import { getCharacters } from "src/api/MarvelApi";

const PAGE_SIZE = 10

export function Home() {
  const [loading, setLoading] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [allData, setAllData] = useState<Character[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState<Character>()
  const [currentTableData, setCurrentTableData] = useState<Character[]>([])

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true)      
        const result: Character[] = await getCharacters({ path: '/characters', queryParams: 'limit=15' })

        setAllData(result)
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
    }

    fetchCharacters()
  }, [])

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE
    const lastPageIndex = firstPageIndex + PAGE_SIZE

    const newTableData = allData.slice(firstPageIndex, lastPageIndex)

    setTotalItems(allData.length)
    setCurrentTableData(newTableData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, allData])

  useEffect(() => {
    const filteredCharacters = allData.filter((character) => character.name.toLowerCase().includes(searchTerm.toLowerCase()))

    setTotalItems(filteredCharacters.length)
    setCurrentTableData(filteredCharacters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])
  
  const handleChange = (term: any) => {
    setSearchTerm(term)
  }

  const handleSearch = async () => {
    setSearchLoading(true)
  }

  const handleModal = (characterId?: string) => {
    if (characterId) {
      setSelectedCharacter(allData.find((character) => character.id === characterId))
    }
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className='container'>
      <div className="header">
        <img alt='Objective Logo' src={ObjectiveLogo} />

        <div className="user-info">
          <span>Nome do candidato</span>
          <span>Henrique de Abreu Pereira</span>

          <div className="profile-icon">
            <span>HP</span>
          </div>
        </div>
      </div>

      <div className="content-container">
        <div className="input-container">
          <span className="title">Busca de Personagens</span>

          <span className="subtitle">Nome do Personagem</span>

          <Input
            disabled={searchLoading || loading}
            value={searchTerm}
            loading={searchLoading}
            onSearch={handleSearch}
            onChange={handleChange}
          />
        </div>

        {loading ? (
          <>Carregando...</>
        ) : (
          <Table
            data={currentTableData}
            handleModal={handleModal}
          />
        )}
      </div>

      {!loading && (
        <div
          className="footer"
          style={currentTableData.length > 4 ? { position: 'sticky' } : {}}  
        >
          <Pagination
            totalItems={totalItems}
            currentPage={currentPage}
            itemsPerPage={PAGE_SIZE}
            onPageChange={(page) => setCurrentPage(Number(page))}
          />
        </div>
      )}

      {isModalOpen && (
        <dialog className="modal">
          <div className="modal-content">

            <img alt={selectedCharacter?.name} src={`${selectedCharacter?.thumbnail.path + '.' + selectedCharacter?.thumbnail.extension}`} />

            <span style={{ padding: 12 }} className="title">{selectedCharacter?.name}</span>

            <div className="modal-info">
              <span className="subtitle">Séries:</span>

              {selectedCharacter?.series.items.map((item, index) => {
                if (index > 3) return

                return (
                  <span style={{ lineHeight: 1.5 }}>{item.name}</span>
                )
              })}
            </div>

            <div className="modal-footer">
              <span>Para ver mais histórias de <b>{selectedCharacter?.name}</b>, clique no botão abaixo</span>

              <div className="button-container">
                <button className="close-btn" onClick={() =>handleModal()}>Fechar</button>
                <a 
                  target="_blank" 
                  rel="noreferrer" 
                  href={selectedCharacter?.urls.find((url) => url.type === "comiclink").url} 
                  className="link"
                >
                  Ir para página da Marvel
                </a>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  )
}
