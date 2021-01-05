import * as React from 'react';

export const ViewLayersIcon : React.FunctionComponent< React.SVGProps<SVGSVGElement>> = (props) => (
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
      d='M49.908 7.502a2.505 2.505 0 00-1.025.263l-40 20c-1.84.923-1.84 3.55 0 4.471L24.41 40 8.883 47.764c-1.843.92-1.843 3.55 0 4.472L24.41 60 8.883 67.764c-1.843.921-1.843 3.55 0 4.472l40 20a2.5 2.5 0 002.234 0l40-20c1.843-.921 1.843-3.551 0-4.472L75.59 60l15.527-7.764c1.843-.921 1.843-3.551 0-4.472L75.59 40l15.527-7.764c1.84-.922 1.84-3.548 0-4.47l-40-20a2.5 2.5 0 00-1.209-.264zM50 12.795L84.412 30 50 47.205 15.588 30zm-20 30l18.883 9.441a2.5 2.5 0 002.234 0L70 42.795 84.41 50 50 67.205 15.59 50zm0 20l18.883 9.441a2.5 2.5 0 002.234 0L70 62.795 84.41 70 50 87.205 15.59 70z'
      color='currentColor'
      fontWeight={400}
      fontFamily='sans-serif'
      overflow='visible'
      fillRule='evenodd'
    />
  </svg>
);
export default ViewLayersIcon;
