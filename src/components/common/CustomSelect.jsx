import React, { useState, useRef, useEffect } from "react";
import styled, { css } from 'styled-components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CustomSelectBlock = styled.div`
    position: relative;
    width: 170px;
    font-family: Arial, sans-serif;
    margin-bottom: 18px;
    font-size: 13px;
    color: #909090;
`

const CustomSelectTrigger = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 8px;
    background-color: #fff;
    border: 1px solid #e9e9e9;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;

    &:focus {
        outline: none;
        border-color: #007BFF;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
`

const ExpandMoreIconCustom = styled(ExpandMoreIcon)`
    margin-left: 10px;
    color: #666;
    width: 15px;
    height: 15px; 
`

const CustomSelectUl = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #fff;
    border: 1px solid #e9e9e9;
    border-radius: 5px;
    margin-top: 4px;
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
    padding: 5px 0;
`;

const CustomSelectLi = styled.li`
    padding: 5px 8px;
    cursor: pointer;

    &:hover {
        background-color: #f5f5f5;
    }

    &:selected {
        background-color: #007BFF;
        color: #fff;
        font-weight: bold;
    }
`

const CustomSelect = ({ options = [], placeholder, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const dropdownRef = useRef(null);

    // 드롭다운 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    
    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onChange) onChange(option);
    };

    return (
        <CustomSelectBlock ref={dropdownRef}>
          <CustomSelectTrigger
            onClick={toggleDropdown}
            tabIndex={0}
          >
            {selectedOption ? selectedOption.selectedLabel : placeholder || "Select..."}
            <ExpandMoreIconCustom />
          </CustomSelectTrigger>
          {isOpen && (
            <CustomSelectUl>
              {options.map((option) => (
                <CustomSelectLi
                  key={option.value}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </CustomSelectLi>
              ))}
            </CustomSelectUl>
          )}
        </CustomSelectBlock>
      );
};

export default CustomSelect;