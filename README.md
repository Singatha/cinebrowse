# Movie Website

A responsive React application for discovering movies and TV series using data from The Movie Database (TMDB).

## Features

- Browse top-rated, popular, and upcoming movies and TV series
- Search for movies and TV series with shareable URL-based results
- View media details, including genres, release dates, runtimes, and recommendations
- Navigate paginated movie, TV, and search results with the current page stored in the URL
- Responsive carousels and layouts for desktop and mobile screens
- Loading, empty, error, and not-found states
- Automated component, hook, utility, and API tests

## Tech Stack

- React 19 and React Router
- Redux Toolkit and RTK Query
- Vite
- Sass and React Bootstrap
- Vitest, React Testing Library, and Mock Service Worker
- ESLint

## Getting Started

### Prerequisites

- Node.js 22.12 or newer
- npm
- A TMDB API key

If you use `nvm`, the repository includes an `.nvmrc` file:

```bash
nvm use
```

### Installation

Clone the repository and enter the project directory:

```bash
git clone https://github.com/Singatha/movie-website.git
cd movie-website
```

Install the dependencies:

```bash
npm install
```

Create your local environment file:

```bash
cp .env.example .env
```

Add your TMDB API key to `.env`:

```env
VITE_MOVIE_API_KEY=your_tmdb_api_key
```

Start the development server:

```bash
npm run dev
```

Vite will print the local URL in the terminal, typically `http://localhost:5173`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check the codebase with ESLint |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |

## Main Routes

| Route | Description |
| --- | --- |
| `/` | Featured, upcoming, and popular media |
| `/list/movies` | Paginated movie catalogue |
| `/list/tv` | Paginated TV catalogue |
| `/search?q=term` | Paginated movie and TV search results |
| `/movies/:mediaID` | Movie details and similar titles |
| `/tv/:mediaID` | TV series details and similar titles |

Pagination is URL-backed. For example, `/list/movies?page=2` opens the second page directly.

## Quality Checks

Run the full local verification before opening a pull request:

```bash
npm test
npm run lint
npm run build
```

## Roadmap

- Add TMDB account authentication
- Add and manage favourite movies and TV series
- Expand automated coverage as new features are introduced
- Improve accessibility and image fallbacks

## Author

[@singatha](https://github.com/singatha)
