import { Pokemon,Page } from "../App";
export const getAllPokemon = (url: string):Promise<Page> => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data)=> resolve(data))
  });
};

export const getPokemon = (url:string):Promise<Pokemon> =>{
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data)=> {
        // console.log(data)
        // console.log(data.abilities)
        resolve(data)
      })
  });
}