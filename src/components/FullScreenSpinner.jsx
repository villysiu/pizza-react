import { Spinner, Image } from 'react-bootstrap';
// import loaderGif from '../assets/giphy.gif';
const FullScreenSpinner = () => {
    
    return (
  <div style={{
    position: 'fixed',
    top: 0, left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)', // gray out
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  }}>
    <Spinner animation="border" />
    {/* <Image 
                        
                        src={loaderGif} 
                        alt="Loading"
                        style={{ 
                          width: "5rem", 
                          aspectRatio: "1/1",
                          objectFit: "cover"}}
                      /> */}
  </div>
    )
  };

export default FullScreenSpinner;