const CardPokemon = ({
    src,
    id,
    name,
    type
}) => {

    return (
        <div className="card">
            <span className="pokemon_name" >{name}</span>
            <div className="card-image" ><img src={src} className="image" /></div>
            <span className="pokemon_id" >N° {id}</span>
            <span className="pokemon_type">{type}</span>
        </div>
    )
}

export default CardPokemon
