# What is Next.js?
- Next.js is a flexible React framework that gives you building blocks to create fast, full-stack web applications.

- By framework, we mean Next.js handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations for your application.


# Why NEXT.JS
- Next.js simplifies the process pf building production-ready web apllications
    - Roting
    - API routes
    - Rendering
    - Data fetching
    - Styling
    - Optimization
    - Dev and prod build system


# Building blocks of a web application
- There are a few things you need to consider when building modern applications. Such as:
    - User Interface - how users will consume and interact with your application.
    - Routing - how users navigate between different parts of your application.
    - Data Fetching - where your data lives and how to get it.
    -R endering - when and where you render static or dynamic content.
    -I ntegrations - what third-party services you use (for CMS, auth, payments, etc.) and how you connect to them.
    -I nfrastructure - where you deploy, store, and run your application code (serverless, CDN, edge, etc.).
    -P erformance - how to optimize your application for end-users.
    -S calability - how your application adapts as your team, data, and traffic grow.
    -D eveloper Experience - your team's experience building and maintaining your application.


# Imperative vs. declarative programming
-  imperative programming -> You're writing the steps for how the user interface should be updated. 

- declarative programming -> But when it comes to building user interfaces, a declarative approach is often preferred because it can speed up the development process -> Instead of having to write DOM methods, it would be helpful if developers were able to declare what they want to show (in this case, an h1 tag with some text).

- In other words, imperative programming is like giving a chef step-by-step instructions on how to make a pizza. Declarative programming is like ordering a pizza without being concerned about the steps it takes to make the pizza. 🍕

- "React is a popular declarative UI library that you can use build user interfaces."


# Creating your first page
- Next.js uses file-system routing. This means that instead of using code to define the routes of your application, you can use folders and files.

- Here's how you can create your first page in Next.js:
    1. Create a new folder called app and move the index.js file inside it.
    2. Rename your index.js file to page.js. This will be the main page of your application.
    3. Add export default to your <HomePage> component to help Next.js distinguish which component to render as the main component of the page.

- A new file called layout.js was automatically created inside the app folder. This is the main layout of your application. You can use it to add UI elements that are shared across all pages (e.g. navigation, footer, etc).


# Why this error shows?
- ERROR => You're importing a component that needs `useState`. This React Hook only works in a Client Component. To fix, mark the file (or its parent) with the `"use client"` directive.

- Reason => This is because Next.js uses React Server Components, a new feature that allows React to render on the server. Server Components don't support useState, so you'll need to use a Client Component instead.


# Server and Client Components
    - https://nextjs.org/learn/react-foundations/server-and-client-components


# Nested routing
- Next.js uses file-system routing where folders are used to create nested routes. 
- Each folder represents a route segment that maps to a URL segment.

- You can create separate UIs for each route using layout.tsx and page.tsx files.
    - page.tsx is a special Next.js file that exports a React component, and it's required for the route to be accessible. In your application, you already have a page file: /app/page.tsx - this is the home page associated with the route /.

    - To create a nested route, you can nest folders inside each other and add page.tsx files inside them

    - " /app/dashboard/page.tsx " is associated with the " /dashboard " path. 



# Colocation
    - https://nextjs.org/docs/app/getting-started/project-structure#colocation

- Good to know: While you can colocate your project files in app you don't have to. If you prefer, you can keep them outside the app directory.


# Why optimize navigation?
- To link between pages, you'd traditionally use the <a> HTML element. At the moment, the sidebar links use <a> elements, but notice what happens when you navigate between the home, invoices, and customers pages on your browser.

Did you see it?

There's a full page refresh on each page navigation!

# The <Link> component
- In Next.js, you can use the <Link /> Component to link between pages in your application. 
- <Link> allows you to do client-side navigation with JavaScript.

# Automatic code-splitting and prefetching
- To improve the navigation experience, Next.js automatically code splits your application by route segments. This is different from a traditional React SPA, where the browser loads all your application code on the initial page load.

- Splitting code by routes means that pages become isolated. If a certain page throws an error, the rest of the application will still work. This is also less code for the browser to parse, which makes your application faster.

- Furthermore, in production, whenever <Link> components appear in the browser's viewport, Next.js automatically prefetches the code for the linked route in the background. By the time the user clicks the link, the code for the destination page will already be loaded in the background, and this is what makes the page transition near-instant!

# Pattern: Showing active links
- A common UI pattern is to show an active link to indicate to the user what page they are currently on. To do this, you need to get the user's current path from the URL. Next.js provides a hook called usePathname() that you can use to check the path and implement this pattern.


# Setting up Database
    - https://nextjs.org/learn/dashboard-app/setting-up-your-database

# Seed your database
- Seeding is useful when you want to have some initial data to work with as you build your application.


# Choosing how to fetch data

1. API layer
- APIs are an intermediary layer between your application code and database. There are a few cases where you might use an API:
    - If you're using third-party services that provide an API.
    - If you're fetching data from the client, you want to have an API layer that runs on the server to avoid exposing your database secrets to the client.

- In Next.js, you can create API endpoints using Route Handlers.
    - https://nextjs.org/docs/app/api-reference/file-conventions/route

2. Database queries
- When you're creating a full-stack application, you'll also need to write logic to interact with your database. For relational databases like Postgres, you can do this with SQL or with an ORM.

- There are a few cases where you have to write database queries:
    - When creating your API endpoints, you need to write logic to interact with your database.
    - If you are using React Server Components (fetching data on the server), you can skip the API layer, and query your database directly without risking exposing your database secrets to the client.

3. Using SQL
- For your dashboard application, you'll write database queries using the postgres.js library and SQL. There are a few reasons why we'll be using SQL:

    - SQL is the industry standard for querying relational databases (e.g. ORMs generate SQL under the hood).
    - Having a basic understanding of SQL can help you understand the fundamentals of relational databases, allowing you to apply your knowledge to other tools.
    - SQL is versatile, allowing you to fetch and manipulate specific data.
    - The postgres.js library provides protection against SQL injections.


# Important points
- The data requests are unintentionally blocking each other, creating a request waterfall.
- By default, Next.js prerenders routes to improve performance, this is called Static Rendering. So if your data changes, it won't be reflected in your dashboard.

# What are request waterfalls?
- A "waterfall" refers to a sequence of network requests that depend on the completion of previous requests. In the case of data fetching, each request can only begin once the previous request has returned data.

# Parallel data fetching
- A common way to avoid waterfalls is to initiate all data requests at the same time - in parallel.

- In JavaScript, you can use the Promise.all() or Promise.allSettled() functions to initiate all promises at the same time. 


# Static and Dynamic Rendering
    - https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering


# What is streaming?
    - https://nextjs.org/learn/dashboard-app/streaming

# Partial Prerendering (PPR)
    - https://nextjs.org/learn/dashboard-app/partial-prerendering


    - https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#adding-the-search-functionality

# The search functionality
- These are the Next.js client hooks that you'll use to implement the search functionality:

    - useSearchParams- Allows you to access the parameters of the current URL. For example, the search params for this URL /dashboard/invoices?page=1&query=pending would look like this: {page: '1', query: 'pending'}.
    - usePathname - Lets you read the current URL's pathname. For example, for the route /dashboard/invoices, usePathname would return '/dashboard/invoices'.
    - useRouter - Enables navigation between routes within client components programmatically. There are multiple methods you can use.

- Here's a quick overview of the implementation steps:
    1. Capture the user's input.
    2. Update the URL with the search params.
    3. Keep the URL in sync with the input field.
    4. Update the table to reflect the search query.

- You can use Next.js's useRouter and usePathname hooks to update the URL.

# defaultValue vs. value / Controlled vs. Uncontrolled

- If you're using state to manage the value of an input, you'd use the value attribute to make it a controlled component. This means React would manage the input's state.

- However, since you're not using state, you can use defaultValue. This means the native input will manage its own state. This is okay since you're saving the search query to the URL instead of state.

# Debouncing is a programming practice that limits the rate at which a function can fire. In our case, you only want to query the database when the user has stopped typing.

- How Debouncing Works:

    1. Trigger Event: When an event that should be debounced (like a keystroke in the search box) occurs, a timer starts.
    2. Wait: If a new event occurs before the timer expires, the timer is reset.
    3. Execution: If the timer reaches the end of its countdown, the debounced function is executed.


# Mutating data
    - https://nextjs.org/learn/dashboard-app/mutating-data


# What is accessibility?
- Accessibility refers to designing and implementing web applications that everyone can use, including those with disabilities. It's a vast topic that covers many areas, such as keyboard navigation, semantic HTML, images, colors, videos, etc.

# Improving form accessibility
1. Semantic HTML: Using semantic elements (<input>, <option>, etc) instead of <div>. This allows assistive technologies (AT) to focus on the input elements and provide appropriate contextual information to the user, making the form easier to navigate and understand.
2. Labelling: Including <label> and the htmlFor attribute ensures that each form field has a descriptive text label. This improves AT support by providing context and also enhances usability by allowing users to click on the label to focus on the corresponding input field.
3. Focus Outline: The fields are properly styled to show an outline when they are in focus. This is critical for accessibility as it visually indicates the active element on the page, helping both keyboard and screen reader users to understand where they are on the form. You can verify this by pressing tab.


# Authentication vs. Authorization

- Authentication is about making sure the user is who they say they are. You're proving your identity with something you have like a username and password.

- Authorization is the next step. Once a user's identity is confirmed, authorization decides what parts of the application they are allowed to use.

- So, authentication checks who you are, and authorization determines what you can do or access in the application.

    - https://nextjs.org/learn/dashboard-app/adding-authentication#authentication-vs-authorization

- providers -> https://authjs.dev/getting-started/authentication/oauth


# MetaData 

    - https://nextjs.org/learn/dashboard-app/adding-metadata




