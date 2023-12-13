import styles from '../styles/Term.module.css';

export default function Term({setTerm}){
    return(
        <ul className={styles.termNav}>
            <li onClick={()=>setTerm('short')}>4 Weeks</li>
            <li onClick={()=>setTerm('medium')}>6 Months</li>
            <li onClick={()=>setTerm('long')}>Years</li>
        </ul>
    )
}