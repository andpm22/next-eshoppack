'use client'

import { IoMdRemoveCircleOutline } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onQuantityChanged: (quantity: number) => void;

}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
    
    const onChangedValue = (value: number) => {
        if(quantity + value < 1) return;
        onQuantityChanged(quantity + value)


    }
  return (
    <div className="flex">
      <button onClick={() => onChangedValue(-1)}>
        <IoMdRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">{quantity}</span>
      <button onClick={() => onChangedValue(1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
