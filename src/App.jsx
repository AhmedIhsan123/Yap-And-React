import { supabase } from "./supbaseClient.js";
import { useEffect, useState } from "react";

function App() {

  // this is our state varible
  const [messages, setMessages] = useState(null);
  const [inputvalue, setInputValue] = useState(null);



	return (
		<>
			<p>Hello World</p>
		</>
	);
}

export default App;
