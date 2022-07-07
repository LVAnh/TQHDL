import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './pages/home.js'
import Chart from './pages/chart.js'
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        heading: `'Montserrat', sans-serif`,
        body: `'Montserrat', sans-serif`,
    },
});

function App() {
    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/chart" element={<Chart/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
