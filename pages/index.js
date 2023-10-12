import React,  { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';

import packageJson from '../package.json';

import { Modal } from '../components/modal';

export default function Home() {

  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const [showModal, setShowModal] = useState(false);

  async function getPokemons() {
    await axios.get('https://pokeapi.co/api/v2/pokedex/2')
      .then(res => {
        setPokemons(res.data.pokemon_entries);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function getPokemon(currentPokemon) {
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${currentPokemon}/`)
      .then(res => {
        setPokemon(res.data);
      })
      .catch(err => {
        console.log(err);
      })

      handleModal();
  }

  const handleModal = () => {
    setShowModal(!showModal);
  }

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div className="container">

      <Modal data={pokemon} isVisible={showModal} handleModal={handleModal} />

      <header className="main-header">
        <img src="/pokeball.png" alt="pokeball" className="pokeball" />
        <img src="/logo.png" alt="logo.png" className="brand" />
        <p className="subtitle">Classic Pokémons</p>
      </header>
      <section>
        <ul className="pokemons-list">
          {
            pokemons.map(({entry_number, pokemon_species}, index) => {
              return (
                <li className="pokemon-item" key={index}>
                  <button onClick={() => getPokemon(entry_number)}>
                    <div>
                      <span className="pokemon-number">#{entry_number}</span>
                      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${entry_number}.png`} alt="" />
                      <h4 className="pokemon-name">{pokemon_species.name}</h4>
                    </div>
                  </button>
                </li>
              )
            })
          }
        </ul>
      </section>
      <footer>
        <p>Criado com <FaHeart className="heart" /> por Wesley A. Alves </p>
      </footer>
    </div>
  );
}


