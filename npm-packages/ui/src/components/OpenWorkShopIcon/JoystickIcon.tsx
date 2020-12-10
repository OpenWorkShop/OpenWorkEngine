import * as React from 'react';

export const JoystickIcon : React.FunctionComponent< React.SVGProps<SVGSVGElement>> = (props) => (
  <svg height={32} width={32} fill='currentColor' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' {...props}>
    <path d='M45 37.2h-6.5v-2.1c0-2.1-1.7-3.8-3.8-3.8-2.1 0-3.8 1.7-3.8 3.8v2.1h-8v-4.7c0-1.1-.9-2-2-2h-.2V17.8c3.1-1.5 5.2-4.7 5.2-8.4C26 4.2 21.8 0 16.6 0S7.2 4.2 7.2 9.4c0 3.7 2.1 6.8 5.2 8.4v12.7h-.2c-1.1 0-2 .9-2 2v4.7H3c-1.7 0-3 1.3-3 3V47c0 .6.4 1 1 1h46c.6 0 1-.4 1-1v-6.8c0-1.7-1.3-3-3-3zm-12-2.1c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8v2.1H33v-2.1zM9.2 9.4c0-4.1 3.3-7.4 7.4-7.4C20.7 2 24 5.3 24 9.4c0 4.1-3.3 7.4-7.4 7.4-4.1 0-7.4-3.3-7.4-7.4zm9.6 9.1v12h-4.4v-12c.7.2 1.4.3 2.2.3.8 0 1.5-.1 2.2-.3zm-6.6 14H21v4.7h-8.8v-4.7zM46 46H2v-5.8c0-.6.4-1 1-1h42c.6 0 1 .4 1 1V46z' />
    <path d='M17.6 4c0-.6-.4-1-1-1-3.5 0-6.4 2.9-6.4 6.4 0 .6.4 1 1 1s1-.4 1-1c0-2.4 2-4.4 4.4-4.4.6 0 1-.4 1-1z' />
  </svg>
);
export default JoystickIcon;
