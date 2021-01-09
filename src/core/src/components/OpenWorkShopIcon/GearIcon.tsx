import * as React from 'react';

export const GearIcon : React.FunctionComponent< React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill='currentColor' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' height={32} width={32} {...props}>
    <path d='M87.024 69.606c.271.059.549.089.825.089h.001c1.59 0 3.016-.959 3.633-2.442a45.327 45.327 0 002.432-7.749c.388-1.792-.561-3.635-2.257-4.383l-6.306-2.78a35.352 35.352 0 00-.021-5.106l6.226-2.744a3.935 3.935 0 002.24-4.466 44.268 44.268 0 00-1.073-3.924 44.082 44.082 0 00-1.438-3.806c-.733-1.705-2.627-2.689-4.438-2.296l-6.649 1.439a35.325 35.325 0 00-2.985-4.144l3.469-5.955c.933-1.602.616-3.651-.752-4.873a45.319 45.319 0 00-6.521-4.839c-1.583-.967-3.768-.653-4.992.717l-4.506 5.042a35.834 35.834 0 00-5.026-1.721l-.7-6.908c-.187-1.83-1.634-3.299-3.441-3.495a44.982 44.982 0 00-8.045-.147 3.933 3.933 0 00-3.648 3.516l-.679 6.699a32.07 32.07 0 00-5.446 1.624l-4.595-5.142c-1.195-1.337-3.298-1.69-4.844-.803a44.898 44.898 0 00-6.517 4.558 3.929 3.929 0 00-.884 4.989l3.372 5.79a35.68 35.68 0 00-3.606 4.837l-6.722-1.455c-1.804-.392-3.689.589-4.433 2.289a45.278 45.278 0 00-2.492 7.385 3.933 3.933 0 002.222 4.542l6.173 2.721a35.314 35.314 0 00-.053 6.26l-6.211 2.738a3.931 3.931 0 00-2.238 4.476 44.035 44.035 0 001.037 3.771 44.48 44.48 0 001.377 3.66c.729 1.711 2.626 2.701 4.441 2.306l6.635-1.436a35.309 35.309 0 003.723 5.033l-3.396 5.829a3.93 3.93 0 00.873 4.98 45.223 45.223 0 006.355 4.509c1.579.926 3.723.599 4.933-.753l4.583-5.128a35.482 35.482 0 005.761 1.793l.675 6.665a3.93 3.93 0 003.647 3.519 44.838 44.838 0 007.952-.143c1.812-.195 3.261-1.666 3.446-3.497l.695-6.859a32.296 32.296 0 005.36-1.888l5.539 6.198a2 2 0 002.48.406 44.694 44.694 0 007.905-5.73c1.35-1.223 1.656-3.264.73-4.852l-3.493-6a35.66 35.66 0 003.054-4.346l6.613 1.43zm-9.383-4.646a31.673 31.673 0 01-4.218 6.011 1.999 1.999 0 00-.234 2.336l4.174 7.168a40.798 40.798 0 01-5.742 4.327l-5.435-6.082a2 2 0 00-2.371-.463c-1.546.757-2.863 1.304-4.145 1.72-1.016.33-2.06.612-3.104.838A2.005 2.005 0 0055 82.57l-.832 8.208c-2.354.247-4.819.188-7.06.189h-.032l-.825-8.141a2 2 0 00-1.65-1.769 31.562 31.562 0 01-7.648-2.373 2 2 0 00-2.316.489l-5.466 6.169c-2.041-1.198-3.99-2.581-5.797-4.027l4.139-7.106a2.002 2.002 0 00-.287-2.393 31.31 31.31 0 01-4.883-6.603 1.996 1.996 0 00-2.176-.991L12.192 66a39.717 39.717 0 01-1.252-3.327c-.354-1.091-.672-2.244-.99-3.351l7.543-3.325a2.001 2.001 0 001.178-2.081 31.253 31.253 0 01.07-8.211 1.999 1.999 0 00-1.175-2.105l-7.474-3.252c.559-2.293 1.322-4.557 2.192-6.71l8.127 1.759a2.002 2.002 0 002.161-.965 31.661 31.661 0 014.794-6.416 2.001 2.001 0 00.295-2.401l-4.115-6.987a40.653 40.653 0 015.847-4.1l5.497 6.151a1.998 1.998 0 002.297.498 32.072 32.072 0 013.004-1.146c1.28-.416 2.667-.748 4.364-1.044a2 2 0 001.646-1.769l.786-8.113a40.963 40.963 0 017.225.124l.836 8.253a2 2 0 001.563 1.752 31.594 31.594 0 016.945 2.384 1.998 1.998 0 002.357-.47l5.409-6.107a41.302 41.302 0 015.868 4.343l-4.156 7.136a2 2 0 00.247 2.35 31.243 31.243 0 014.174 5.801 1.995 1.995 0 002.171.983l7.984-1.777a40.096 40.096 0 011.308 3.459c.371 1.143.699 2.343 1.024 3.494l-7.553 3.329a2 2 0 00-1.179 2.072c.284 2.327.296 4.731.034 7.146a1.999 1.999 0 001.182 2.045l7.556 3.331c-.521 2.369-1.257 4.71-2.114 6.943l-8.047-1.742a1.996 1.996 0 00-2.18 1.006z' />
    <path d='M49.936 26.094c-2.503 0-4.99.396-7.393 1.176-6.073 1.974-11.016 6.194-13.915 11.884a23.759 23.759 0 00-1.436 18.244 23.85 23.85 0 0022.734 16.526h.002c2.503 0 4.989-.396 7.392-1.176 12.538-4.074 19.424-17.589 15.351-30.128a23.85 23.85 0 00-22.735-16.526zm6.148 42.849c-2.002.651-4.073.98-6.155.98h-.001A19.86 19.86 0 0130.997 56.16a19.777 19.777 0 011.195-15.191 19.773 19.773 0 0111.587-9.896 19.878 19.878 0 016.156-.98 19.86 19.86 0 0118.931 13.763c3.393 10.441-2.342 21.695-12.782 25.087z' />
  </svg>
);
export default GearIcon;