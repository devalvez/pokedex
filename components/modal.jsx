import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export const Modal = ({ isVisible, data, handleModal }) => {

  async function getTypes( url ) {
    await axios.get(url)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err);
      })
  }

  if(!isVisible)
    return <></>

  return (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-header">
          <burron className="close-button" onClick={handleModal}>
            <span><FaTimes /></span>
            Close
          </burron>
        </div>
        <div className="modal-body">
          <div className="modal-content">
            <div className="pokemon-information">

              <ul>
                <li>
                  <span className="list-title">ID :</span>
                  <span>{data.id || '00'}</span>
                </li>
                <li>
                  <span className="list-title">Height :</span>
                  <span>{data.height || '0'}</span>
                </li>
                <li>
                  <span className="list-title">Weight :</span>
                  <span>{data.weight || '0'}</span>
                </li>
                <li>
                  <span className="list-title">Abilities :</span>
                  <div>
                    {
                      data.abilities.map(({ability}, index) => (
                        <span className="badge badge-red" key={index}>{ability.name}</span>
                      ))
                    }
                  </div>
                </li>
                <li>
                  <span className="list-title">Types :</span>
                  <div>
                    {
                      data.types.map(({type}, index) => {
                        return (
                          <span key={index} className="badge badge-red">{type.name}</span>
                        )
                      })
                    }
                  </div>
                </li>
                <li>
                  <span className="list-title">Forms :</span>
                  <span>
                    {
                      data.forms.map(({name}, index) => (
                        <span key={index}>{name}</span>
                      ))
                    }
                  </span>
                </li>
              </ul>

            </div>  
            <div className="pokemon-art">
              <img src={data.sprites.other['official-artwork'].front_default} alt="" /> 
              <h4 className="pokemon-name">{data.name}</h4>

            </div>
            <div className="pokemon-statistics">
              <ul>
              {
                data.stats.map(({base_stat, stat}) => (
                  <li>
                    <span className={stat.name === 'hp' ? 'list-title text-uppercase' : 'list-title text-capitalize'}>{stat.name}</span>
                    <div className="inline">
                      <div className="progress-bar">
                        <div className="progress-status-red" style={{width: `${base_stat}%`}}></div>
                      </div>
                      <span className="stat_value">{base_stat}</span>
                    </div>
                  </li>
                ))
              }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}