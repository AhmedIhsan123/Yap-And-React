import { useState } from "react";

export default function UsernameBar({ username, setUsername }) {
	const [isEditing, setIsEditing] = useState(false);
	const [tempUsername, setTempUsername] = useState("");

	return (
		<>
			{isEditing ? (
				<>
					<input
						value={tempUsername}
						onChange={(e) => setTempUsername(e.target.value)}
					/>
					<button
						onClick={() => {
							setUsername(tempUsername);
							setIsEditing(false);
						}}
					>
						Save
					</button>
					<button onClick={() => setIsEditing(false)}>Cancel</button>
				</>
			) : (
				<>
					<span>{username}</span>
					<button
						onClick={() => {
							setTempUsername(username);
							setIsEditing(true);
						}}
					>
						Edit
					</button>
				</>
			)}
		</>
	);
}
