import { FaRotateLeft, FaRotateRight } from 'react-icons/fa6';
import { LuFlipHorizontal2, LuFlipVertical2 } from 'react-icons/lu';

export const filterOptions = [
  { id: 1, name: 'brightness' },
  { id: 2, name: 'saturation' },
  { id: 3, name: 'inversion' },
  { id: 4, name: 'grayscale' },
];

export const rotateOptions = [
  { id: 1, icon: <FaRotateLeft />, direction: 'left' },
  { id: 2, icon: <FaRotateRight />, direction: 'right' },
  { id: 3, icon: <LuFlipHorizontal2 />, direction: 'horizontal' },
  { id: 4, icon: <LuFlipVertical2 />, direction: 'vertical' },
];

export const setLocalStorage = (state) => {
  localStorage.setItem('state', JSON.stringify(state));
};

export const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem('state'));
};
