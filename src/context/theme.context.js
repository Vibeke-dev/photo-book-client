import { createContext, useState } from 'react';
import natureBook from './../images/bookNature.png';
import summerBook from './../images/bookSummer2.png';

const ThemeContext = createContext();

// CREATE A WRAPPER COMPONENT
function ThemeProviderWrapper(props) {
  const [theme, setTheme] = useState('/static/media/bookNature.8063108d.png');
  const toggleTheme = () => {
    if (theme === '/static/media/bookNature.8063108d.png') {
      setTheme(summerBook);
    } else {
      setTheme(natureBook);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProviderWrapper };
