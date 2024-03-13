import styled from 'styled-components';

export const StyledInput = styled.input`
    border: 1px solid gray;
    border-radius: 4px;
    width: 30%;
    max-width: 400px;
    margin: 20px;
    padding: 12px;

    &:focus {
        border-color: black;
    }
`;
