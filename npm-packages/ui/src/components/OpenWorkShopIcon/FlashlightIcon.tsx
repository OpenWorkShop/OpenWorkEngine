import * as React from 'react';

export const FlashlightIcon : React.FunctionComponent< React.SVGProps<SVGSVGElement>> = (props) => (
  <svg height={32} width={32} fill='currentColor' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M31.356 30.34h37.289c0 7.777-4.765 14.436-11.533 17.232v38.316A7.112 7.112 0 0150 93h0a7.112 7.112 0 01-7.112-7.112V47.572c-6.767-2.796-11.532-9.455-11.532-17.232zM50 16.707V7M39.236 19.198L36.053 9.84M60.764 19.198l3.183-9.358M60.764 19.198l3.183-9.358M57.112 55.775H42.888M57.112 63.514H42.888'
      fill='none'
      stroke='currentColor'
      strokeWidth={4}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit={10}
    />
  </svg>
);
export default FlashlightIcon;
