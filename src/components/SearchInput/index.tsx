import React from 'react';
import {StyledInput} from './styles';

interface InputProps {
    onSearch: (searchTerm: string) => void;
}

const SearchInput: React.FC<InputProps> = ({onSearch}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.trim();
        onSearch(searchTerm);
    };

    return <StyledInput type="text" placeholder="Filter..." onChange={handleChange} />;
};

export default SearchInput;
