import { useRef, useState } from 'react';
import styles from '../styles/Term.module.css';

export default function Term({setTerm, term}){
    const time = term.time_range;

    return(
        <ul className={styles.termNav}>
            <li onClick={()=>{
                setTerm('short')
                }} className={time == 'short_term' ? styles.active : ''} >4 Weeks</li>
            <li onClick={()=>setTerm('medium')} 
                className={time == 'medium_term' ? styles.active : ''}>6 Months</li>
            <li onClick={()=>setTerm('long')}
                className={time == 'long_term' ? styles.active : ''}>Years</li>
        </ul>
    )
}