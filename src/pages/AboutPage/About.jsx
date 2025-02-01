import './About.css';
import Logo from '../../assets/logo.png'

const About = () => {
  return (
    <div className="about-container">
      <h2>About</h2><img src={Logo} alt="Running Tracker Logo"className="logo-image2"/> 
      <p> 
      This application was created to help Brunella and other runners achieve their running goals. 
        We believe in the power of running to improve physical and mental well-being and hope this app can be a valuable tool for everyone.  
      </p>
      <div className="team-members">
        <div className="team-member">
          <img src="https://media.licdn.com/dms/image/v2/D4D03AQG9815cCiJCHw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1670249089945?e=1743638400&v=beta&t=8vnsbavuoQRnTVMSLiIQv4XwINh47Ijvuxy0LxU9RIc" alt="Brunella Carvalho" /> 
          <h3>Brunella Carvalho</h3>
          <p><a href="https://www.linkedin.com/in/brunella-nmcarvalho/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
          <p><a href="https://github.com/brunellanmcarvalho1" target="_blank" rel="noopener noreferrer">GitHub</a></p>
        </div>

        <div className="team-member">
          <img src="https://media.licdn.com/dms/image/v2/C4D03AQH274eJuRkpsQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1616875014389?e=1743638400&v=beta&t=YB1XC-yJK1zAHNqmLYiXeU_oG9K7zuMAXy20pkdaqpg" alt="Victor Marchesi" /> 
          <h3>Victor Marchesi</h3>
          <p><a href="https://www.linkedin.com/in/victor-marchesi/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
          <p><a href="https://github.com/vicmarchesi" target="_blank" rel="noopener noreferrer">GitHub</a></p>
        </div>
      </div>
    </div>
  );
};

export default About;