// https://blog.sapegin.me/til/react/generating-typescript-react-components-from-svg-icons-using-svgr/
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const svgr = require('@svgr/core').default;

const ICONS_SOURCE_DIR = './assets/icons';
const COMPONENTS_DIR = './src/components/OpenWorkShopIcon';

function toTitleCase(str) {
    return str
        .split('-')
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
const components = {};
const imports = ['import React from \'react\';'];
const checks = [];
const iconNames = [];
const componentNames = [];

for (const icon of icons) {
    const svg = fs.readFileSync(icon, 'utf8');
    const iconName = path.parse(icon).name;
    iconNames.push(iconName);
    const componentName = toTitleCase(path.parse(icon).name) + 'Icon';
    componentNames.push(componentName);
    const opts = [`name === '${iconName}'`, `name === '${componentName}'`];
    if (iconName === 'tdp') {
      opts.push('name === \'3dp\'');
      iconNames.push('3dp');
    }
    imports.push(`import ${componentName} from './${componentName}';`);
    checks.push(`  if (${opts.join(' || ')}) return <${componentName} {...props} />;`);
    components[iconName] = componentName;
    console.log(icon, componentName);
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

const index = `${imports.join('\n')}

export { ${Object.values(components).join(', ')} }; 

export interface IOwsIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
}

export type IconName = '${iconNames.join('\' | \'')}';
export type ComponentName = '${componentNames.join('\' | \'')}';
export type OwsIconName = IconName | ComponentName;

export const Icons: React.FunctionComponent<IOwsIconProps> = (props) => {
  const name = props.name.toLowerCase();

${checks.join('\n')}

  return <span>{name}</span>;
};

export default Icons;
`;

fs.writeFileSync(`${COMPONENTS_DIR}/index.tsx`, index);
