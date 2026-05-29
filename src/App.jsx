import { supabase } from "./supabaseClient.js";
import { useEffect, useState } from "react";
import MessageList from "./components/MessageList.jsx";
import UsernameBar from "./components/UsernameBar.jsx";

// Generate a random sender id
const senderId = crypto.randomUUID();

function App() {
	// State variables
	const [messages, setMessages] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [username, setUsername] = useState("John Doe");

	// Load messages and subscribe to changes on load
	useEffect(() => {
		// An async method to fetch messages from the db
		async function fetchMessagesData() {
			const { data } = await supabase
				.from("messages")
				.select("*")
				.order("created_at", { ascending: true });
			setMessages(data);
		}

		// Make a call to fetch the data asynchronously
		fetchMessagesData();

		// sync subscription - no async needed
		const channel = supabase
			.channel("messages")
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "messages" },
				(payload) => {
					setMessages((prev) => [...prev, payload.new]);
				},
			)
			.subscribe();

		return () => supabase.removeChannel(channel);
	}, []);

	async function sendMessage() {
		if (inputValue.trim() !== "") {
			// Write to the messages table
			await supabase.from("messages").insert({
				username: username,
				content: inputValue,
				sender_id: senderId,
			});
			// Reset input value after sending message
			setInputValue("");
		}
	}

	return (
		<>
			{/* This is the component that will display all messages */}
			{/* {console.log(messages[0])} */}
			<section>
				<UsernameBar username={username} setUsername={setUsername} />
				<MessageList messages={messages} />
			</section>

			<input
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={(e) => e.key === "Enter" && sendMessage()}
			/>
			<button onClick={sendMessage}>Send</button>
		</>
	);
}

export default App;
