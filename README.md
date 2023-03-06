# Solar System

This web app lists all the planets of the solar system as well as their respective moons retrieved from this API: [https://api.le-systeme-solaire.net/](https://api.le-systeme-solaire.net/).

It will allow you to discover the unique characteristics of each planet, as well as their moons, such as their size, temperature, distance from the sun, or revolution period. 

Additionally, through [OpenAI](https://openai.com/), it provide you with detailed descriptions of each planet that will help you better understand their history and role in the solar system.

## Google Lighthouse Score

- Performance: **100**
- Accessibility: **100**
- Best Practices: **100**
- SEO: **100**

## Links

Link to the online  Solar System App:
https://solar-system-theta.vercel.app/

Link to the online storybook:
https://solar-system-storybook.vercel.app/

## Getting Started

First, install the dependencies:
```bash
npm install
```

Then, create .env.local file in the root directory with these variables:

```
OPEN_AI_SK=YOUR-OPEN-AI-KEY
RAPID_API_SK=YOUR-RAPID-API-KEY
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

Run the storybook server:

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) with your browser to see the storybook app.