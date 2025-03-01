# TodoApp

A modern TODO application built using **React**, **TypeScript**, and a suite of cutting-edge frontend technologies. This project incorporates best practices such as **API caching**, **code splitting**, **CI/CD**, and **unit testing** to ensure it is **readable**, **reusable**, **maintainable**, and **scalable**.

## Live Demo

[TodoApp Demo](https://todo-app-smoky-tau-48.vercel.app)

![TodoApp Demo](/public/todo-app.webp)

## Tech Stack

- **Framework**: React
- **State Management**: Redux, Context API
- **Type Checking**: TypeScript
- **Styling**: TailwindCSS
- **Testing**: Jest, Testing Library, Vitest
- **Backend**: Supabase
- **Data Fetching**: TanStack Query
- **UI Components**: shadcn-ui
- **Build Tool**: Vite

## Best Practices

### API Caching

- **TanStack Query** is used for API data fetching and caching, ensuring efficient data management and reducing unnecessary API calls. This makes the application **scalable** and **maintainable**.

### Code Splitting

- Leveraging **Vite's dynamic import** feature, the application is split into smaller chunks, improving initial load times and making the codebase more **readable** and **reusable**.

### CI/CD

- **GitHub Actions** is used to set up a CI/CD pipeline, ensuring automated testing and deployment. This enhances the **maintainability** and reliability of the project.

### Unit Testing

- **Jest** and **Testing Library** are used for unit testing components, ensuring the code is **reliable** and **maintainable**.

## Setup Instructions

1. Clone the repository.

   ```bash
   git clone https://github.com/yutounun/TodoApp.git
   cd TodoApp

   ```

2. Install dependencies.

   ```bash

   npm install

   ```

3. Set up environment variables. Create a .env file and add your Supabase URL and key.

   ```bash

   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

   ```

4. Start the development server.

   ```bash

   npm run dev

   ```

5. Run tests.

   ```bash

   npm test

   ```
