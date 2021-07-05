import React from 'react';
import styles from './Footer.module.css';

const Footer = ({ userName }) => (<div className={styles.footer}>
  <div className={styles.footerTitle}>
    <h1>{userName}</h1>
    <p>Привет, я junior frontend-developer. Я могу помочь вам создать ваш следующий проект.</p>
  </div>
  <div className={styles.footerMenu}>
    <p>Menu</p>
    <ol>
      <li><a className={styles.footerLink} href={"#about"}>About</a></li>
      <li><a className={styles.footerLink} href={"#works"}>Works</a></li>
      <li><a className={styles.footerLink} href={"#skills"}>Skills</a></li>
      <li><a className={styles.footerLink} href={"#repos"}>Git repositories</a></li>
    </ol>
  </div>
  <div className={styles.footerContacts}>
    <p>Contacts</p>
    <a href={'mailto:wow5222@yandex.ru'}> wow5222@yandex.ru </a><br/>
    <a href={'tel:+79130822502'}>+7 (913) 082-25-02</a>
  </div>
</div>);

export default Footer;
