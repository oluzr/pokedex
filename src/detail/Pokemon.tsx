import styled from "@emotion/styled";
import PokeMarkChip from "../common/PokeMarkChip";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { fetchPokemonsDetail } from "../store/detailSlice";

const Pokemon = () => {
  const { name } = useParams();
  const dispatch = useAppDispatch();
  const imageType = useSelector((state: RootState) => state.imageType.type);
  const { pokemonDetails } = useSelector(
    (state: RootState) => state.pokemonDetail
  );
  const pokemon = name ? pokemonDetails[name] : null;
  useEffect(() => {
    if (!name) {
      return;
    }
    dispatch(fetchPokemonsDetail(name));
  }, [dispatch, name]);

  if (!pokemon || !name) {
    return null;
  }

  return (
    <Container>
      <ImageContainer>
        <Image src={pokemon.images[imageType]} alt={pokemon.koreanName} />
      </ImageContainer>
      <Body>
        <h2>기본정보</h2>
        <Table>
          <tbody>
            <tr>
              <th>번호</th>
              <td>{pokemon.id}</td>
            </tr>
            <tr>
              <th>이름</th>
              <td>
                {pokemon.koreanName} ({pokemon.name})
              </td>
            </tr>
            <tr>
              <th>타입</th>
              <td>{pokemon.types.toString()}</td>
            </tr>
            <tr>
              <th>키</th>
              <td>{pokemon.height}m</td>
            </tr>
            <tr>
              <th>몸무게</th>
              <td>{pokemon.weight}kg</td>
            </tr>
          </tbody>
        </Table>
        <h2>능력치</h2>
        <Table>
          <tbody>
            {pokemon.baseStats.map((stat) => {
              return (
                <tr key={stat.name}>
                  <th>{stat.name}</th>
                  <td>{stat.value}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Body>
      <Footer>
        <PokeMarkChip />
      </Footer>
    </Container>
  );
};
const Container = styled.section`
  border: 1px solid #c0c0c0;
  border-radius: 15px;
  box-shadow: 1px 1px 1px 1px #c0c0c0;
  margin: 15px;
  min-height: 50vh;
  padding: 15px 25px;
`;
const ImageContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px dashed #ccc;
  margin-bottom: 20px;
`;
const Image = styled.img`
  max-width: 90%;
`;
const Body = styled.div``;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 20px auto 50px;
  th,
  td {
    padding: 5px;
  }
  th {
    width: 1px;
    white-space: nowrap;
    text-align: left;
    color: #444;
    font-weight: 500;
  }
  tr {
    border-bottom: 1px solid #eee;
  }
`;
const Footer = styled.section`
  display: flex;
`;
export default Pokemon;
