import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import SearchInput from '..';

describe('SearchInput Component', () => {
    it('should call onSearch function with trimmed search term when input changes', () => {
        const mockOnSearch = jest.fn();
        render(<SearchInput onSearch={mockOnSearch} />);
        const input = screen.getByRole('textbox');
        const testSearchTerm = '  test  ';
        fireEvent.change(input, {target: {value: testSearchTerm}});
        expect(mockOnSearch).toHaveBeenCalledWith(testSearchTerm.trim());
    });
});
