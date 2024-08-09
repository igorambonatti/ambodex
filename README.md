# DEX

## Features

- Decentralized exchange capabilities.
- Optimal exchange rates leveraging Bittensor technology.
- User-friendly interface built with the latest web technologies.

## Technologies Used

This project is built using the following technologies:

- **Next.js 14:** The React framework for production used for server-rendered apps, static websites, and more.
- **TypeScript:** A superset of JavaScript that adds static type definitions, to ensure a more reliable codebase.
- **Context API:** React's context system for managing global state without props drilling.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **SCSS:** A preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets (CSS).

## Run Locally

Follow these instructions to set up the project locally.

### Prerequisites

1. **Install Node.js:**

   Ensure you have Node.js installed on your machine. Node.js can be downloaded from [https://nodejs.org/](https://nodejs.org/).

### Installation

1. **Install Dependencies:**

   Run the following command to install the necessary dependencies for the project:

   ```bash
   npm install

3. **Start project:**

   ```bash
   npm run dev

  Open http://localhost:3000 in your browser to view the application.

### Project Structure
    /public
      /assets
        - *Directory for storing project assets*
    /src
      /app
        /(pages) 
          - *Setup of all routes and default layouts*
        /api 
          - *Setup for Axios and Fetch API calls*
        /fonts 
          - *Setup fonts*
      /components
        - *React components*
      /constants
        - *Exports constants for use across the app*
      /context
        - *Store application contexts for state management*
      /hooks
        - *Hooks for context selectors*
      /utils
        - *Global functions*
      /styles
        - *Global style configuration*
      /types
        - *Global types configuration*
