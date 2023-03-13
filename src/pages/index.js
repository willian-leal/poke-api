/* eslint-disable react/jsx-key */
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import CardPokemon from '@/components/CardPokemon'

const Pokemon = ({ data }) => {
  const [details, setDetails] = useState(null)

  useEffect(() => {
    axios
      .get(data.url)
      .then((response) => setDetails(response.data))
  }, [])

  if (details === null) {
    return <div>-</div>
  }
  return (
    <CardPokemon
      src={details['sprites']['versions']['generation-v']['black-white']['animated']['front_default']}
      id={details.id}
      name={details.name}
      type={details.types.map(typeInfo => typeInfo.type.name).join(' | ')}
    />
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState([])
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${(currentPage - 1) * 50}&limit=50`)
      .then((response) => {
        setList(response.data.results)
        setTotalPages(Math.ceil(response.data.count / 50));
      })
  }, [currentPage])

  const listFiltered = list.length > 0 ? list.filter(pokemon => pokemon.name.toLowerCase().includes(filter.toLowerCase())) : list;

  const [totalPages, setTotalPages] = useState(1);

  return (
    <div>
      <div className='search'>
        <form className='form'>
          <input
            type="search"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder='Search for ID or Pokemon name'
            className='input'
            name='pokemon'
            id='pokemon'
          />
        </form>
        {currentPage > 1 && (
          <button className='button' onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        )}

        {currentPage < totalPages && (
          <button className='button' onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        )}
      </div>
      <div className='section'>
        {listFiltered.map((item) => (
          <>
            <Pokemon key={item.name} data={item} />
          </>
        ))}
      </div>
    </div>
  );
}

export default App