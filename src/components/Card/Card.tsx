import React from "react";
import { Pokemon } from "../../App";
import "./Card.css";
interface PokemonProps {
  pokemon: Pokemon;
}

// const Card:React.FC<PokemonProps> = ({ pokemon }) => {
const Card = ({ pokemon }:PokemonProps) => {
  // console.log(pokemon.sprites.front_default)
  return (
    <div className="card" key={pokemon.id}>
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt="" className="src" />
      </div>
      <h3 className="cardName">{pokemon.name}</h3>
      <div className="cardType">
        <div>タイプ</div>
        {pokemon.types.map((type) => {
          return (
            <div>
              <span>{type.type.name}</span>
            </div>
          );
        })}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p>重さ：{pokemon.weight}</p>
        </div>
        <div className="cardData">
          <p>高さ：{pokemon.height}</p>
        </div>
        <div className="cardData ability">
          {/* <p>アビリティ：{pokemon.abilities[0].ability.name.toString()}</p> */}
          <p>アビリティ</p>
          {pokemon.abilities.map((ability)=>{
            return <p>{ability.ability.name} </p>
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
