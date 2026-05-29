import MessageBubble from "./MessageBubble";

export default function MessageList({ messages }) {
	// A variable that holds all the message objects as p elements
	const messageObjects = messages.map((message) => {
		return <MessageBubble key={message.id} message={message} />;
	});

	return <section>{messageObjects}</section>;
}
