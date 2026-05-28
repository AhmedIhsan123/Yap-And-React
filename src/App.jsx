import { supabase } from "./supbaseClient.js";
import { useEffect, useState } from "react";

function App() {
	// State variables
	const [messages, setMessages] = useState(null);
	const [inputvalue, setInputValue] = useState(null);

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

	return (
		<>
			<p>Messages: {messages}</p>
		</>
	);
}

export default App;
