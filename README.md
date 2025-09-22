# Creative Upaay Dashboard

A modern React.js task management dashboard built with Material-UI, Redux, and drag-and-drop functionality.

## Features

✅ **Task Management**

- Create, edit, and delete tasks
- Move tasks between columns (To Do, In Progress, Done)
- Task priorities (High, Medium, Low) with color coding
- Task categories for better organization
- Timestamps for task creation

✅ **Interactive UI**

- Drag and drop functionality for moving tasks between columns
- Responsive design that works on desktop and mobile
- Clean, modern Material-UI components
- Hover effects and smooth transitions

✅ **Filtering & Search**

- Filter tasks by priority level
- Filter tasks by category
- Search tasks by title or description
- Clear all filters option
- Real-time filter indicators

✅ **State Management**

- Redux Toolkit for efficient state management
- Local Storage persistence - tasks survive page refreshes
- Optimistic UI updates for smooth user experience

✅ **Sample Data**

- Pre-loaded with 5 sample tasks to demonstrate functionality
- Tasks distributed across all three columns
- Various priorities and categories shown

## Technology Stack

- **Frontend**: React.js 19.1.1
- **UI Library**: Material-UI (MUI) 7.3.2
- **State Management**: Redux Toolkit
- **Styling**: Material-UI theming system + Custom CSS
- **Drag & Drop**: Native HTML5 Drag and Drop API
- **Build Tool**: Create React App
- **Storage**: Local Storage for persistence

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
