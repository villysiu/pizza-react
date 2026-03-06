 import {EnvelopeAtFill, Github, Linkedin } from 'react-bootstrap-icons'
const Footer = () => {
    return (
        <>
            <div><b>@2026 Pizza Villy Siu</b> </div>
            <div className="mt-3">
                {/* <a href="mailto:villysiu@gmail.com" className="me-3">
                    <EnvelopeAtFill size={30} color="gray" />
                </a> */}
                <a href="https://www.linkedin.com/in/villy-siu-384b81132/" target="_blank" className="me-3">
                <Linkedin size={30} color="gray" />
                </a>
                <Github size={30} color="gray" /> 
                <a href="https://github.com/villysiu/nodejs-pizza-api" target="_blank">
                    backend
                </a>
                {"  "}
                <a href="https://github.com/villysiu/pizza-react" target="_blank">
                    frontend
                </a>
            </div>
            <a href="/api-docs" target="_blank">API Documentation</a>
        </>
    )}
export default Footer