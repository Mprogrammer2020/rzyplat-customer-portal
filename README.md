## Customer Management React Application

### Introduction
This repository contains a React.js component for managing customer data within a web application. The component utilizes various libraries and APIs to facilitate functionalities such as fetching customer data, sorting, searching, and deleting customer records.

### Prerequisites
Before running this code, ensure you have the following dependencies installed:
- Node.js
- npm (Node Package Manager)

### Installation
1. Clone this repository to your local machine using the following command:
   ```
   git clone https://github.com/Mprogrammer2020/rzyplat-customer-portal.git
   ```
2. Navigate to the project directory:
   ```
   cd rzyplat-customer-portal
   ```
3. Install the necessary dependencies using npm:
   ```
   npm install
   ```

### Usage
To use the `Customer` component in your React application, follow these steps:

1. Import the `Customer` component into your React application:
   ```javascript
   import Customer from './path/to/Customer';
   ```

2. Render the `Customer` component within your application:
   ```javascript
   <Customer />
   ```

### Features
- **Fetching Customer Data**: Retrieves customer data from an API using Axios.
- **Sorting**: Allows sorting customer data based on various attributes like name, role, and joined date.
- **Pagination**: Implements pagination to load and display a large number of customer records efficiently.
- **Deleting Customers**: Provides functionality to delete customer records from the database.
- **Responsive Design**: Designed to adapt to different screen sizes for a seamless user experience.

### Dependencies
- React.js: JavaScript library for building user interfaces.
- React Bootstrap: UI library for React applications, providing pre-designed components.
- React Router DOM: Library for handling routing in React applications.
- Axios: Promise-based HTTP client for making API requests.
- Skeleton: Library for creating loading skeletons to enhance user experience during data fetching.
