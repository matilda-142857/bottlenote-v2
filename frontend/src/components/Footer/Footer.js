import './Footer.css';

const Footer = () => {

    return(
        <div className="footer">
            <div className="footer-line-break"></div>
            <div className="footer-programs">
                <ul className='footer-programs-list'>

                    <li><a href="https://github.com/matilda-142857">Github</a></li>
                    <li><a href="https://www.linkedin.com/in/matilda-zhang-328ba8186/">Linkedin</a></li>

                    <li><a href="https://reactjs.org/">React</a></li>
                    <li><a href="https://redux.js.org/">Redux</a></li>
                    <li><a href="https://www.postgresql.org/">Postgres</a></li>
                    <li><a href="https://sequelize.org/">Sequelize</a></li>
                    <li><a href="https://www.javascript.com/">Javascript</a></li>
                    <li><a href="https://html.com/html5//">HTML5</a></li>
                </ul>
            </div>
        </div>
    ) 
}

export default Footer;