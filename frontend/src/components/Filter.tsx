import React from 'react';
import styled from 'styled-components';
import { FilterType } from '../types';

interface FilterProps {
  onFilterChange: (filter: FilterType) => void;
}

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const FilterButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) => (active ? '#8884d8' : '#1c1c1e')};
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #6c64b3;
  }
`;

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = React.useState<FilterType>('daily');

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <FilterContainer>
      <FilterButton
        active={activeFilter === 'daily'}
        onClick={() => handleFilterChange('daily')}
      >
        Daily
      </FilterButton>
      <FilterButton
        active={activeFilter === 'weekly'}
        onClick={() => handleFilterChange('weekly')}
      >
        Weekly
      </FilterButton>
      <FilterButton
        active={activeFilter === 'monthly'}
        onClick={() => handleFilterChange('monthly')}
      >
        Monthly
      </FilterButton>
    </FilterContainer>
  );
};

export default Filter;
