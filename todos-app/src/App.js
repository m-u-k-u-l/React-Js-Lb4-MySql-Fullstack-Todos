import './App.css';
import Home from './components/todos/Home';
import TodoView from './components/todos/TodoView';
import TodoEdit from './components/todos/TodoEdit';
import About from './components/about/About';
import AppDescription from './components/app-description/AppDescription';
import Layout from './components/layout/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
    <Layout>
    <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/app-desc" element={<AppDescription />} />
          <Route path="/edit/:id" element={<TodoEdit />} />
          <Route path="/view/:id" element={<TodoView />} />
      </Routes>
    </Layout>
    </BrowserRouter>
  );
}

export default App;
