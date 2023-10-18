import styled from "@emotion/styled";

const PokeMarkChip = () => {
  return (
    <Chip>
      <Text>Pokemon</Text>
    </Chip>
  );
};

const Chip = styled.div`
  border: 1px solid #c0c0c0;
  font-weight: 500;
  border-radius: 15px;
  display: flex;
  gap: 0 7px;
  align-items: center;
  margin-left: auto;
  box-shadow: 0.5px 0.5px 0 0 #c0c0c0;
`;
const Text = styled.label`
  padding: 3px 7px;
  font-weight:600;
  font-size:14px;
`;
export default PokeMarkChip;
