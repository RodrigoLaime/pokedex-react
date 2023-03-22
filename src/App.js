import { useEffect } from 'react';
import { Col, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Searcher from './components/Searcher';
import PokemonList from './components/PokemonList';
import logo from './statics/logo (2).svg'
import { getPokemon } from './api';
import { getPokemonsWithDetails, setLoading } from './actions';
import './App.css';

function App() {
  const pokemons = useSelector(state => state.get('pokemons')).toJS();
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    const fetchPokemons = async () => {
      const pokemonsRes = await getPokemon();
      dispatch(getPokemonsWithDetails(pokemonsRes))
      dispatch(setLoading(false))
    };
    fetchPokemons();
  }, []);

  return (
    <div className="App">
      <Col span={4} offset={10}>
        <img src={logo} alt='Pokedex' />
      </Col>
      <Col span={8} offset={8}>
        <Searcher />
      </Col>
      {loading
        ?
        <Col offset={12}>
          <Spin spinning size='large' />
        </Col>
        :
        <PokemonList pokemons={pokemons} />
      }
    </div>
  );
}

export default App;
