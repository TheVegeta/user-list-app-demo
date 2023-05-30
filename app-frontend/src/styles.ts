import styled from "@emotion/styled";

export const Input = styled.input<{ isValid: boolean; isFilter?: boolean }>`
  padding: ${(props) =>
    props.isFilter ? "0.5rem 1rem 0.5rem 1rem" : "0.5rem 6rem 0.5rem 1rem"};
  margin: 0.5rem 0;
  box-sizing: border-box;
  border: ${(props) =>
    props.isValid ? "0.125rem solid #c2c2c2" : "0.125rem solid red"};
  border-radius: 0.6rem;
  font-size: 1rem;

  &::placeholder {
    color: #5e5252;
  }

  &:focus {
    outline: none;
    border-color: ${(props) => (props.isValid ? "#000" : "red")};
  }
`;

export const Card = styled.div`
  border: 1px solid #c2c2c2;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-shadow: 1px 1px 5px 0px #c2c2c2;
  border-radius: 1rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    width: 18rem;
    padding: 1.3rem;
    margin-top: none;
  }
`;

export const Button = styled.button`
  color: #fff;
  background: #000;
  padding: 0.7rem;
  border-radius: 1rem;
  box-shadow: none;
  border-width: 0;
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: 1rem;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

export const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 300;
  margin-bottom: 0.2rem;
  color: #5e5252;
  margin-top: 1rem;
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 90vh;
`;

export const Error = styled.p`
  color: red;
`;

export const Navbar = styled.div`
  display: flex;
  padding: 1rem 10rem;
  justify-content: space-between;

  h4 {
    font-size: 1.5rem;
  }

  div {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: black;
  }

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    padding: 1rem;

    div {
      display: flex;
      gap: 1rem;
      flex-direction: column;
      align-items: center;
    }

    a {
      text-decoration: none;
      color: black;
    }
  }
`;

export const Table = styled.table`
  padding: 1rem !important;
  border-collapse: collapse;
  width: 100%;
  border-radius: 1rem;

  td,
  th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    font-weight: bold;
  }

  th:hover {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

export const TableFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  margin: 1rem;

  span {
    display: flex;
    align-items: center;
  }

  button {
    background-color: #000;
    color: #fff;
    border-radius: 1rem;
    padding: 0.8rem;
    box-shadow: none;
    border: none;
  }

  button:hover {
    cursor: pointer;
  }
`;
