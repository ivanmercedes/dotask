import React from "react";
import ReactDOM from "react-dom";


const App = () => {
  return ( 
   
  <div className="col-md-4">
    <div className="bg-dark rounded shadow-sm text-white p-2">
      <h1>hola</h1>
    </div>
  </div>
    
   );
}
 
export default App;
// export default App;


var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);