# Sandbox Component Workflow

This directory contains a set of React components that demonstrate a modular data fetching and display workflow using React Hooks.

## Component Structure

### DataContainer
The root component that orchestrates the data flow and visualization:
- Initializes the mock API server on mount
- Manages the selected data route state
- Renders the SelectList for user input
- Configures the DataFetcher with the appropriate URL
- Provides a render function to format the fetched data

### SelectList
A reusable dropdown component that:
- Displays a list of available data routes (Sales and Subscriptions)
- Handles user selection changes
- Propagates selection changes back to the parent component

### DataFetcher
A generic data fetching component that implements the render props pattern:
- Manages the entire data fetching lifecycle (loading, error, success states)
- Uses useEffect hook to trigger data fetching when the URL changes
- Handles error cases and loading states
- Delegates the actual data rendering to a provided render function

## Data Flow

1. **Initialization**
   - DataContainer mounts and initializes the mock API server
   - SelectList displays available data options

2. **User Interaction**
   - User selects a data type (Sales or Subscriptions)
   - Selection triggers URL update in DataContainer

3. **Data Fetching**
   - DataFetcher receives new URL and initiates API call
   - Loading state is displayed during fetch
   - On success, data is passed to render function
   - On error, error message is displayed

4. **Data Display**
   - Fetched data is formatted with timestamps (ISO format) and values
   - Rendered as a list of data points

## API Integration

The components work with a mock API that provides two endpoints:
- `/sales` - Returns time series data for sales
- `/subscriptions` - Returns time series data for subscriptions

Each data point contains:
- `timestamp` - ISO format timestamp
- `amount` - Numeric value for the metric

## Error Handling

The workflow includes comprehensive error handling:
- Network errors during fetch operations
- Invalid API responses
- Loading states for better user experience
