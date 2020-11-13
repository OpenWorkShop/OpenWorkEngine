// https://blog.sapegin.me/til/react/generating-typescript-react-components-from-svg-icons-using-svgr/
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const svgr = require('@svgr/core').default;

const ICONS_SOURCE_DIR = 'assets/icons';
const COMPONENTS_DIR = 'src/components/Icons';

function toTitleCase(str) {
  return str
    .split('_')
    .map((txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    .join('');
}

// Template to generate named exports instaed of default ones
const iconComponentTemplate = ({ template }, opts, { imports, componentName, jsx }) =>
  template.smart({ plugins: ['typescript'] }).ast`
        ${imports}
        ${'\n'}
        export const ${componentName} = (props) => ${jsx};
        
        export default ${componentName};
    `;

const icons = glob.sync(`${ICONS_SOURCE_DIR}/**.svg`);

for (const icon of icons) {
  const svg = fs.readFileSync(icon, 'utf8');
  const componentName = toTitleCase(path.parse(icon).name) + 'Icon';
  const componentCode = svgr.sync(
    svg,
    {
      template: iconComponentTemplate,
      // 1. Clean SVG files using SVGO
      // 2. Generate JSX
      // 3. Format the result using Prettier
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
      // Replace hardcoded colors with `currentColor`
      svgoConfig: {
        plugins: [{ convertColors: { currentColor: true } }],
      },
      // Replace dimentions
      svgProps: { height: 32, width: 32 },
    },
    { componentName },
  );
  fs.writeFileSync(
    `${COMPONENTS_DIR}/${componentName}.tsx`,
    // template would not let me do this for some reason...
    componentCode.toString().replace('= (props', `: React.FunctionComponent< React.SVGProps<SVGSVGElement>> = (props`),
  );
}
