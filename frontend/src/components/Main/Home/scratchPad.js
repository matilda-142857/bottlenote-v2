import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../../store/session";

const ScratchPad = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const [padContent, setPadContent] = useState(user.scratchPad);

	useEffect(() => {
		dispatch(sessionActions.updateScratchPad(
            { scratchPad: padContent }
        ));
	}, [padContent]);

	return (
		<div className="scratch-pad">
			<div className="scratch-pad-title">
				SCRATCH PAD
			</div>
			<textarea
				className="pad-textarea"
				type="text"
				name="scratchPad"
				placeholder="Jot things down here..."
				value={padContent}
				onChange={(e) => setPadContent(e.target.value)}
			/>
		</div>
	);
};

export default ScratchPad;