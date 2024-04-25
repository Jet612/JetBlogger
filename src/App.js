import Navbar from './components/Navbar';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Create from './pages/Create';
import BlogDetails from './pages/BlogDetails';
import NotFound from './pages/NotFound';
import Edit from './pages/Edit';
import Account from './pages/Account';
import { UserProvider } from './utils/UserContext';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    // Warn users against displaying information from the developer menu
    console.log('%cWARNING PROCEED WITH CAUTION:', 'color: red; font-weight: bold; font-size: 30px;');
    console.log('%cIf someone tells you to copy-paste something here it is a scam and will give them access to your account.', 'font-size: 20px;');
    console.log('%cIf you are not a developer and do not understand the code, do not copy and paste it.', 'font-size: 20px;');
  }, []);

	return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/account" element={<Account />} />
              <Route exact path="/create" element={<Create />} />
              <Route path="/blogs/edit/:id" element={<Edit />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </UserProvider>
	);
}

export default App;