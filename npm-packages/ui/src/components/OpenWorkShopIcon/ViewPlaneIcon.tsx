import * as React from 'react';

export const ViewPlaneIcon : React.FunctionComponent< React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill='currentColor' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' height={32} width={32} {...props}>
    <path
      style={{
        lineHeight: 'normal',
        textIndent: 0,
        textAlign: 'start',
        textDecorationLine: 'none',
        textDecorationStyle: 'solid',
        textTransform: 'none',
        whiteSpace: 'normal',
        isolation: 'auto',
        mixBlendMode: 'normal',
        marker: 'none',
      }}
      d='M10 7.499a2.5 2.5 0 00-2.5 2.5v60a2.5 2.5 0 002.5 2.5h17.5v17.502a2.5 2.5 0 002.5 2.5h60a2.5 2.5 0 002.5-2.5v-60a2.5 2.5 0 00-2.5-2.5H72.5V9.999a2.5 2.5 0 00-2.5-2.5zm2.5 5h55v15.002H30a2.5 2.5 0 00-2.5 2.5v37.498h-15zm20 20.002h55v55h-55z'
      color='currentColor'
      fontWeight={400}
      fontFamily='sans-serif'
      overflow='visible'
      fillRule='evenodd'
    />
  </svg>
);
export default ViewPlaneIcon;
