import React from "react";

const DeleteIcon = ({ width }) => {
  return (
    <svg
      fill='#000000'
      width={width}
      viewBox='0 0 24 24'
      id='delete-alt'
      data-name='Flat Line'
      xmlns='http://www.w3.org/2000/svg'
      class='icon flat-line'
    >
      <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
      <g
        id='SVGRepo_tracerCarrier'
        stroke-linecap='round'
        stroke-linejoin='round'
      ></g>
      <g id='SVGRepo_iconCarrier'>
        <path
          id='secondary'
          d='M5,8H18a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H5a0,0,0,0,1,0,0V8A0,0,0,0,1,5,8Z'
          transform='translate(26 2) rotate(90)'
          style={{ fill: "#2ca9bc", strokeWidth: 2 }}
        ></path>
        <path
          id='primary'
          d='M16,7V4a1,1,0,0,0-1-1H9A1,1,0,0,0,8,4V7'
          style={{
            fill: "none",
            stroke: "#000000",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
          }}
        ></path>
        <path
          id='primary-2'
          data-name='primary'
          d='M10,11v6m4-6v6M4,7H20M18,20V7H6V20a1,1,0,0,0,1,1H17A1,1,0,0,0,18,20Z'
          style={{
            fill: "none",
            stroke: "#000000",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
          }}
        ></path>
      </g>
    </svg>
  );
};

export default DeleteIcon;
