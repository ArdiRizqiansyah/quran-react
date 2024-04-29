import '@scss/app.scss'

import NavbarTop from "../components/Navbar";

// eslint-disable-next-line react/prop-types
export default function Main({ children }) {
    return (
        <>
            <NavbarTop />

            {children}
        </>
    )
}
