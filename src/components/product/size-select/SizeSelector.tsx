import type { Size } from "@/interfaces"
import clsx from "clsx";


interface Props {
    selectedSize?: Size;
    availabeSizes: Size[];

    onSizeChanged: (size: Size) => void;
}

export const SizeSelector = ({ selectedSize, availabeSizes, onSizeChanged }: Props) => {


  return (
    <div className="my-5">
        <h3 className="font-bold mb-4" >Availabe sizes</h3>
        <div className="felx" >
            {
                availabeSizes.map(size => (
                    <button className={
                        clsx(
                            "mx-2 hover:underline text-lg",
                            {
                                'underline': size === selectedSize
                            }
                        )
                    } key={size}
                    onClick={() => onSizeChanged(size)}
                    >
                        {size}
                    </button>
                ))
            }
        </div>
    </div>
  )
}
