import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import _shuffle from 'lodash.shuffle';
import gql from 'graphql-tag';

import { Modal } from './components';
import { Spinner } from './components';
import './App.css';

const GET_CHARACTERS = gql`
  query GET_CHARACTERS {
    characters(page:1){
        results{
          id
          name
          image
        }
    }
  }
`

export default function App() {

  let [opened, setOpened] = useState([]);
  let [matched, setMatched] = useState([]);
  let [shuffledCharacters, setShuffledCharacters] = useState([]);
  let { data, loading, error } = useQuery(GET_CHARACTERS);

  function flickCard(index) {
    setOpened([...opened, index]);
  }

  useEffect(() => {
    if (!loading) {
      let characters = data.characters.results.slice(0, 6);
      setShuffledCharacters(_shuffle([...characters, ...characters]));
    }
  }, [data])

  useEffect(() => {
    if (opened.length >= 2) {
      let firstCharacter = shuffledCharacters[opened[0]];
      let secondCharacter = shuffledCharacters[opened[1]];
      if (firstCharacter.name === secondCharacter.name) {
        setMatched(match => [...match, firstCharacter.name]);
      }
    }

  }, [opened]);

  useEffect(() => {
    let timeoutId;
    if (opened.length >= 2) {
      timeoutId = setTimeout(() => {
        setOpened([])
      }, 800)
    }

    return () => clearTimeout(timeoutId);
  }, [opened])

  return (
    <div className="app">
      <div className="cards">
        {
          shuffledCharacters.map((character, index) => {
            let isFlicked = false;
            if (opened.includes(index)) isFlicked = true;
            if (matched.includes(character.name)) isFlicked = true;
            return <PokemonCard key={index} onClick={() => flickCard(index)} pokemon={character} isFlicked={isFlicked} />
          })
        }
      </div>
      {
        loading ? (
          <>
            <Modal>
              <Modal.ModalContent>
                <Spinner />
              </Modal.ModalContent>
            </Modal>
          </>
        ) : null
      }
    </div>
  );
}

function PokemonCard({ pokemon, isFlicked, onClick }) {
  return (
    <button onClick={onClick} className={`pokemon-card ${isFlicked ? "flipped" : null}`}>
      <div className="inner">
        <div className="front">
          <img alt="pokemon.name" width="100" src={`${pokemon.image}`} />
        </div>
        <div className="back">
          ?
        </div>
      </div>
    </button>
  )
}
