import React from "react";
import "../../styles/Header.css";

const Header = () => {
	return (
		<div className="header">
			<div className="header-content">
				<img src="/images/waldoLogo.png" alt="W logo" className="header-logo" />
				<h1 className="header-title">Waldo's & Company</h1>
			</div>
		</div>
	);
};

export default Header;
