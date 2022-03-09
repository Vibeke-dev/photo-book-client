import { createContext, useState } from 'react'; 
import book from './../images/bookNeutral.jpg';

const ThemeContext = createContext();

// CREATE A WRAPPER COMPONENT
function ThemeProviderWrapper(props) {
    const [theme, setTheme] = useState('light');
 
    const toggleTheme = () => {
        if (theme === 'light') {
          setTheme({book});
        } else {
          setTheme('light');
        }
      };

      console.log("vibekeThemeContext")
      console.log(theme)
     
      return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          {props.children}
        </ThemeContext.Provider>
      );
    }
     
    export { ThemeContext, ThemeProviderWrapper };
