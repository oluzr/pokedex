import styled from "@emotion/styled";
import PokeCard from "./PokeCard";
import { useEffect } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { RootState, useAppDispatch } from "../store";
import { fetchPokemons } from "../store/pokemonSlice";
import { useSelector } from "react-redux";
const PokeCardList = () => {
  const { pokemons } = useSelector((state: RootState) => state.pokemons);

  const dispatch = useAppDispatch();
  const [infinityRef] = useInfiniteScroll({
    loading: false,
    hasNextPage: pokemons.next !== "",
    onLoadMore: async () => {
      dispatch(fetchPokemons(pokemons.next));
    },
    disabled: false,
    rootMargin: "0px 0px 100px 0px",
  });

  useEffect(() => {
    dispatch(fetchPokemons(""));
  }, [dispatch]);
  return (
    <>
      <List>
        {pokemons.results.length > 0 &&
          pokemons.results.map((pokemon, idx) => {
            return (
              <PokeCard key={`${pokemon.name}_${idx}`} name={pokemon.name} />
            );
          })}
      </List>
      <div ref={infinityRef}>
        <Loading>Loading...</Loading>
      </div>
    </>
  );
};

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 40px;
  justify-content: center;
`;

export default PokeCardList;
