## Lab 5.2 - TanStack Query Integration

# What change you want(ed) to make in your application

I wanted to change how my application loads employee data from the backend. Before this lab, the Employees page used a manual `useEffect` with `fetch` to get data. I changed this because the page was handling loading data by itself. I wanted the employee data to be managed in a cleaner way, with better support for loading, errors, refreshing, and cached server data.

# What tool or tools you've made use of to make this change

I used TanStack Query in the React frontend application. I installed `@tanstack/react-query` and added `QueryClientProvider` in the main frontend file so the whole application can use query features. I also used the `useQuery` hook on the Employees page to request employee data from the backend. The refresh button uses the `refetch` function from TanStack Query to reload the data.

# How this change affects the user experience

This change affects the user experience by making the employee data loading clearer and more reliable. Users can now see that the employee data is being managed through TanStack Query, and they can use the Refresh Data button to reload employee information without refreshing the whole browser page. If the backend is not available, the page can still show local employee data instead of completely breaking.

# How this change affects your understanding, or conceptualization, of the app

This change helped me understand that a full-stack application has different types of state. Some state belongs only to the frontend, such as search text or form inputs. Other state comes from the backend, such as employee records from the database. TanStack Query helped me understand server state better because it manages fetching, caching, loading, and refreshing instead of making me write all of that logic manually.