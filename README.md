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
- **Unit tests** for forms and service functions (using Jest & React Testing Library)

---

## Technologies Used

- **Next.js 13+** (App Router)  
- **React 18+**  
- **TypeScript**  
- **Chakra UI** (UI components)  
- **React Hook Form** (Form handling & validation)  
- **Jest + React Testing Library** (Unit tests)  
- **MSW** (Mock Service Worker for API testing)  

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
git clone <your-repo-url>
cd <repo-folder>

# Install dependencies
npm install
# or
yarn install
```


### Running the App

```bash
# Start the development server
npm run dev

# or
yarn dev
```
