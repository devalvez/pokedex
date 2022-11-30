import React from 'react';
import axios from 'axios';

export const PokemonButton = ({ data }) => {

  return (
    <button onClick={() => getPokemon(data.entry_number)}>
      <div>
        <span className="pokemon-number">#{data.entry_number}</span>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.entry_number}.png`} alt="" />
        <h4 className="pokemon-name">{data.pokemon_species.name}</h4>
      </div>
    </button>
  )
}