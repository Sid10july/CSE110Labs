import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from "./themeContext"; // Import the context and themes

// ClickCounter component that consumes the ThemeContext
export function ClickCounter() {
  const [count, setCount] = useState(0);
  const theme = useContext(ThemeContext); // Consuming the theme context

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div
      style={{
        background: theme.background, // Apply theme background
        color: theme.foreground, // Apply theme foreground
        padding: "20px",
      }}
    >
      <p>You clicked {count} times</p>
      <button
        onClick={() => setCount(count + 1)}
        style={{ background: theme.foreground, color: theme.background }} // Apply theme to button
      >
        Click me
      </button>
    </div>
  );
}

// Wrapper component to provide the ThemeContext
function ToggleTheme() {
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <ClickCounter /> {/* The ClickCounter component is wrapped and can access the theme */}
    </ThemeContext.Provider>
  );
}

export default ToggleTheme;