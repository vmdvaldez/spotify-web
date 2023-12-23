import { Link } from 'react-router-dom';
import styles from '../styles/NavBar.module.css';

export default function NavBar(){
    return(
        <nav id="nav">
            <ul className={styles.navItems}>
                <Link to="topartists" className={styles.navItem}><li>Top Artists</li></Link>
                <Link to="topsongs" className={styles.navItem}><li>Top Songs</li></Link>
                <Link to="recentlyplayed" className={styles.navItem}><li>Recently Played</li></Link>
            </ul>
        </nav>
    )
}