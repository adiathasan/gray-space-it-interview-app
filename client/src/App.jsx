import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header/Header';
import HomeScreen from './screens/homeScreen/HomeScreen';
import LoginScreen from './screens/loginScreen/LoginScreen';
import RegisterScreen from './screens/registerScreen/RegisterScreen';
import BlogDetailsScreen from './screens/blogDetailsScreen/BlogDetailsScreen';
import Footer from './components/footer/Footer';
const App = () => {
	return (
		<Router>
			<div className='app'>
				<Header />
				<div className='app__switch'>
					<Switch>
						<Route path='/blogs/:blogId' component={BlogDetailsScreen} />
						<Route path='/register' component={RegisterScreen} />
						<Route path='/login' component={LoginScreen} />
						<Route path='/' component={HomeScreen} exact />
					</Switch>
					<Footer />
				</div>
			</div>
		</Router>
	);
};

export default App;
