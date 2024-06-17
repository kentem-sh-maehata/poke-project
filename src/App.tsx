import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";

type NamedAPIResource = {
  name: string;
  url: string;
};
type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
};
type PokemonType = {
  slot: number;
  type: NamedAPIResource;
};
// ポケモンの画像
type PokemonSprites = {
  front_default: string;
};
export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  types: PokemonType[];
  sprites: PokemonSprites;
};

export type Page = {
  previous: string | null;
  next: string | null;
};

function App() {
  // const initialURL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=21";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>();
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=21"
  );
  const [page, setPage] = useState<Page>({
    previous: null,
    next: "https://pokeapi.co/api/v2/pokemon?offset=21&limit=21",
  });

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンのデータ
      let res = await getAllPokemon(url);
      setPage({
        previous: res.previous,
        next: res.next,
      });
      // 各ポケモンの詳細なデータ
      if ("results" in res && Array.isArray(res.results))
        loadPokemon(res.results);
    };
    fetchPokemonData();
  }, [url]);

  const loadPokemon = async (data: NamedAPIResource[]) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon: NamedAPIResource) => {
        let pokemonRecord;
        pokemonRecord = getPokemon(pokemon.url);
        // console.log(pokemonRecord)

        return pokemonRecord;
      })
    );
    if (_pokemonData) setPokemonData(_pokemonData);

    setLoading(false);
  };

  const handlePrevPage = () => {
    setLoading(true);
    if (page.previous) setUrl(page.previous);
  };
  const handleNextPage = () => {
    setLoading(true);

    if (page.next) setUrl(page.next);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中...</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData &&
                pokemonData.map((pokemon, i) => {
                  return <Card key={i} pokemon={pokemon} />;
                })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
