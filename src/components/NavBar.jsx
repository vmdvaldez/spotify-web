import styles from '../styles/NavBar.module.css';

export default function NavBar(){
    return(
        <nav id="nav">
            <ul className={styles.navItems}>
                <li>Top Artists</li>
                <li>Top Songs</li>
            </ul>
        </nav>
    )
}