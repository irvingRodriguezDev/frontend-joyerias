import React from "react";

const EditIcon = ({ width }) => {
  return (
    <svg
      fill='#000000'
      width={width}
      viewBox='0 0 24 24'
      id='edit-alt-2'
      data-name='Flat Line'
      xmlns='http://www.w3.org/2000/svg'
      class='icon flat-line'
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g
        id='SVGRepo_tracerCarrier'
        stroke-linecap='round'
        stroke-linejoin='round'
      ></g>
      <g id='SVGRepo_iconCarrier'>
        <polygon
          id='secondary'
          points='10.47 9.29 14.71 13.53 7.24 21 3 21 3 16.76 10.47 9.29'
          style={{ fill: "#2ca9bc", strokeWidth: 2 }}
        ></polygon>
        <path
          id='primary'
          d='M20.41,7.83l-2.88,2.88L13.29,6.47l2.88-2.88a1,1,0,0,1,1.42,0l2.82,2.82A1,1,0,0,1,20.41,7.83ZM3,16.76V21H7.24l7.47-7.47L10.47,9.29Z'
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

export default EditIcon;
