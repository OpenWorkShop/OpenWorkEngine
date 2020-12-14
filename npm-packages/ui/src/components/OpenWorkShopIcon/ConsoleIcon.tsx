import * as React from 'react';

export const ConsoleIcon : React.FunctionComponent< React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill='currentColor' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' height={32} width={32} {...props}>
    <path d='M88.45 83.28h-76.9a5.31 5.31 0 01-5.3-5.3V22.02c0-2.92 2.38-5.3 5.3-5.3h76.9c2.92 0 5.3 2.38 5.3 5.3v55.96c0 2.92-2.38 5.3-5.3 5.3zm-76.9-61.56c-.17 0-.3.13-.3.3v55.96c0 .17.13.3.3.3h76.9c.17 0 .3-.13.3-.3V22.02c0-.17-.13-.3-.3-.3h-76.9z' />
    <path d='M22.58 53.03c-.38 0-.77-.15-1.06-.44a1.49 1.49 0 010-2.12l8.19-8.19-8.51-8.51a1.49 1.49 0 010-2.12 1.49 1.49 0 012.12 0l9.57 9.57c.59.59.59 1.54 0 2.12l-9.25 9.25c-.29.29-.67.44-1.06.44zM55.44 53.03H37.95c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h17.49c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z' />
  </svg>
);
export default ConsoleIcon;
