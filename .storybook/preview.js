export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'black',
    values: [
      {
        name: 'black',
        value: '#000',
      },
      {
        name: 'red',
        value: '#db273c',
      },
    ],
  },
};