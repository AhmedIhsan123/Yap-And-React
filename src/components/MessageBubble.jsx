export default function MessageBubble({ message }) {
	// console.log(message);
	return <p>{`<${message.username}>: ${message.content}`}</p>;
}
