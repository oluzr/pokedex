import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { POKEMON_IMAGE_TYPE } from "../constants";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { ChangeEvent } from "react";
import { PokemonImageKeyType, changeImageType } from "../store/imageTypeSlice";
const PageHeader = () => {
  const type = useSelector((state: RootState) => state.imageType.type);
  const dispatch = useAppDispatch();
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      changeImageType({
        type: e.target.value as PokemonImageKeyType,
      })
    );
  };
  return (
    <Header>
      <Titlt>
        <Link to={"/"}>Pokémon</Link>
      </Titlt>
      <Select value={type} onChange={handleChange}>
        <option value={POKEMON_IMAGE_TYPE.OFFICIAL_ARTWORK}>Official</option>
        <option value={POKEMON_IMAGE_TYPE.DREAM_WORLD}>DreamWorld</option>
        <option value={POKEMON_IMAGE_TYPE.FRONT_DEFAULT}>FrontDefault</option>
      </Select>
    </Header>
  );
};

const Header = styled.nav`
  display: flex;
  padding: 15px 30px;
  margin-bottom: 16px;
  border-bottom: 1px solid #c0c0c0;
`;
const Titlt = styled.h1`
  font-size: 32px;
  color: #ffca09;
  text-shadow: -1px 0 blue, 0 2px blue, 1px 0 blue, 0 -1px blue;
`;

const Select = styled.select`
  display: flex;
  margin-left: auto;
  padding: 8px 12px;
  border-radius: 8px;
`;
export default PageHeader;
