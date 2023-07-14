import fs from 'fs-extra';

const cssFile = await fs.readFile('variables.css', 'utf-8');
const inform = console.log;

// Helper function to convert hex to RGB format
async function hexToRGB(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r} ${g} ${b})`;
}

async function updateVariablesCSS() {
  const colors = {
    dark: [
      {
        baseColor: "black",
        code: "#000",
        shades: '#000',
        tints: [ '#000', '#202020', '#404040', '#606060', '#808080', '#9F9F9F', '#BFBFBF', '#DFDFDF' ]
      },
      {
        baseColor: "onyx",
        code: "#000626",
        shades: [ '#000626', '#000521', '#00051D', '#000418', '#000313', '#00020E', '#00020A', '#000105' ],
        tints: [ '#000626', '#202541', '#40445C', '#606377', '#808393', '#9FA2AE', '#BFC1C9', '#DFE0E4' ]
      },
      {
        baseColor: "zinnwaldite brown",
        code: "#262000",
        shades: [ '#262000', '#211C00', '#1D1800', '#181400', '#131000', '#0E0C00', '#0A0800', '#050400' ],
        tints: [ '#262000', '#413C20', '#5C5840', '#777460', '#939080', '#AEAB9F', '#C9C7BF', '#E4E3DF' ]
      },
      {
        baseColor: "dark byzantium",
        code: "#543E59",
        shades: [ '#543E59', '#4A364E', '#3F2F43', '#352738', '#201721', '#AA9FAC', '#151016', '#0B080B' ],
        tints: [ '#543E59', '#69566E', '#7F6E83', '#2A1F2D', '#948697', '#BFB7C1', '#D4CFD6', '#EAE7EA' ]
      },
      {
        baseColor: "gray asparagus",
        code: "#43593E",
        shades: [ '#43593E', '#3B4E36', '#32432F', '#2A3827', '#222D1F', '#192117', '#111610', '#080B08' ],
        tints: [ '#43593E', '#5B6E56', '#72836E', '#8A9786', '#A1AC9F', '#B9C1B7', '#D0D6CF', '#E8EAE7' ]
      }
    ],
    light: [
      {
        baseColor: "white",
        code: "#FFF",
        shades: [ '#FFF', '#DEDEDE', '#BFBFBF', '#9F9F9F', '#808080', '#606060', '#404040', '#202020' ],
        tints: '#FFF'
      },
      {
        baseColor: "snow",
        code: "#FFF5FD",
        shades: [ '#FFF5FD', '#DFD6DD', '#BFB8BE', '#9F999E', '#807B7F', '#605C5F', '#403D3F', '#201F20' ],
        tints: [ '#FFF5FD', '#FFF6FD', '#FFF8FE', '#FFF9FE', '#FFFAFE', '#FFFBFE', '#FFFDFF', '#FFFEFF' ]
      },
      {
        baseColor: "light apricot",
        code: "#FFD9B3",
        shades: [ '#FFD9B3', '#DFBE9D', '#BFA386', '#9F8870', '#806D5A', '#605143', '#40362D', '#201B16' ],
        tints: [ '#FFD9B3', '#FFDEBD', '#FFE3C6', '#FFE7D0', '#FFECD9', '#FFF1E3', '#FFF6EC', '#FFFAF6' ]
      },
      {
        baseColor: "cyan",
        code: "#02FFE1",
        shades: [ '#02FFE1', '#02DFC5', '#02BFA9', '#019F8D', '#018071', '#016054', '#014038', '#00201C' ],
        tints: [ '#02FFE1', '#22FFE5', '#41FFE9', '#61FFEC', '#81FFF0', '#A0FFF4', '#C0FFF8', '#DFFFFB' ]
      },
      {
        baseColor: "rasberry",
        code: "#F00060",
        shades: [ '#F00060', '#D20054', '#B40048', '#96003C', '#780030', '#5A0024', '#3C0018', '#1E000C' ],
        tints: [ '#F00060', '#F22074', '#F44088', '#F6609C', '#F880B0', '#F99FC3', '#FBBFD7', '#FDDFEB' ]
      },
      {
        baseColor: "blue",
        code: "#0000FF",
        shades: [ '#0000FF', '#0000DF', '#0000BF', '#00009F', '#000080', '#000060', '#000040', '#000020' ],
        tints: [ '#0000FF', '#2020FF', '#4040FF', '#6060FF', '#8080FF', '#9F9FFF', '#BFBFFF', '#DFDFFF' ]
      }
    ]
  }

  // Convert hex values and generate CSS rules
  const cssRules = [];
  for (const type of Object.values(colors)) {
    for (const { baseColor, shades, tints } of colors[type]) {

      // Convert shades
      const convertedShades = Array.isArray(shades) 
        ? await Promise.all(shades.map(hexToRGB)) : shades;

      // Convert tints
      const convertedTints = Array.isArray(tints) 
        ? await Promise.all(tints.map(hexToRGB)) : tints;

      // Generate CSS rules
      const cssRule = generateCssRule(baseColor, 'shades', convertedShades);
      cssRules.push(cssRule);

      const cssRule2 = generateCssRule(baseColor, 'tints', convertedTints);
      cssRules.push(cssRule2);
    }
  }

  // Join the CSS rules into a single string
  const updatedCSS = cssRules.join('\n');
  
  // Write the updated CSS to the variables.css file
  await fs.writeFile('variables.css', updatedCSS, 'utf-8');
};

// Helper function to generate CSS rule
function generateCssRule(baseColor, type, values) {
  const cssVariable = `--color-${type}-${baseColor.replace(/\s/g, '-').toLowerCase()}`;
  const cssValues = Array.isArray(values) ? values.join(', ') : values;
  return `${cssVariable}: ${cssValues};`;
}

async function configTheme() {

  const theme = {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    colors: {
      blue: '#1fb6ff',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      grayDark: '#273444',
      gray: '#8492a6',
      grayLight: '#d3dce6'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem'
      },
      borderRadius: {
        _4xl: '2rem'
      }
    }
  }
}

await configTheme();
await updateVariablesCSS();
inform('Variables CSS file updated successfully.');
