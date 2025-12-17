# Students Management App

A simple **Next.js 13+ (App Router) application** for managing student records. The app allows you to create, read, update, and delete students, with a clean UI built using **Chakra UI**, and form management handled by **React Hook Form**.

---

## Features

- **Create, Read, Update, Delete (CRUD) Students**
- **Form validation** with React Hook Form
- **Search** students by name, GPA, or department
- **Student detail view** with all relevant information
- **Delete confirmation** with toast notifications
- **Responsive UI** with Chakra UI components
- **Mock data storage** using JSON files (`students.json`)

---

## Technologies Used

- **Next.js 13+** (App Router)  
- **React 18+**  
- **TypeScript**  
- **Chakra UI** (UI components)  
- **React Hook Form** (Form handling & validation)  

---

## Project Structure

The project folder structure:

    /app
      /students
        /[id]
          page.tsx          # Student details
          edit/page.tsx     # Edit student
        new/page.tsx        # Create new student
        page.tsx            # List students
    /lib
      db.ts                 # Type definitions
      students.service.ts   # CRUD helpers
    /components
      pages
        students-table.tsx  # Table display
        student-info.tsx    # Student detail card
      ui
        toaster.tsx         # Custom toast notifications
    /public
      /data
        students.json       # Mock student data

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/rick427/edTech.git
cd <repo-folder>

# Install dependencies
npm install
# or
yarn install
```
After installing create a .env file with the following content

```js
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```


### Running the App

```bash
# Start the development server
npm run dev

# or
yarn dev
```

---

## Available Scripts

- **dev** Start Next.js development server
- **build** Build the app for production
- **start** start production server

---

## API Endpoints

- **GET - /api/students** Get all students
- **GET - /api/students/:id** Get student by ID
- **POST - /api/students** Create a new student
- **PUT - /api/students** Update student by ID
- **DELETE - /api/students/:id** Delete student by ID

---

## Student Data
Stored in /public/data/students.json with the following structure

```js
[
    {
        "id": "uuid",
        "name": "John Doe"
        "dob": "YYYY-MM-DD",
        "gpa": 3.5,
        "major": "Computer Science",
        "registrationNumber": "REG-2025-01"
    }
]
```

---

## UI Hightlights
- Student Table - Sortable, filterable, searchable,
- Student Card - Display avatar, name, major, GPA,DOB, registration number
- Toaster Notification - Success/error messages on CRUD operations
- Form Validation - Required fields, GPA range (0-4), proper date format

---

## Future Improvements
- Connect to a real backend database instead of reading and writing to a JSON file 
- Add pagination for the student table 
- Implement role-based access control for CRUD operations 
- Add E2E tests using Playwright or Cypress