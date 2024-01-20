/** @jsx RReact.createElement */
import RReact from './code/React.js';

// const App = React.createElement('div', { id: 'app' }, 'hi-', 'mini-react');
const App = <div>hi-mini-react</div>

function AppOne() {
  return <div>hi-mini-react</div>;
}

console.log(AppOne)

export default App;