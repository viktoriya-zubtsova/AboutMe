import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import TelegramIcon from '@material-ui/icons/Telegram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Pagination from '@material-ui/lab/Pagination';
import { Octokit } from '@octokit/rest';
import Skills from '../Skills/Skills';
import Works from '../Works/Works';
import Footer from '../Footer/Footer';
import styles from './App.module.css';

const octokit = new Octokit();
class App extends React.Component {
  state = {
    isLoading: true,
    repoList: [],
    error: false,
    repoPaginList: [],
    paginLimit: 4
  }

  componentDidMount() {
    octokit.users.getByUsername({
      username: 'viktoriya-zubtsova'
    }).then(( json ) => {
        this.setState({
          isLoading: false,
          userLogin: json.data.login,
          userAvatar: json.data.avatar_url,
          userUrl: json.data.html_url,
          userBio: json.data.bio,
          userName: json.data.name,
      });
    }).catch(error => {
      this.setState({
        error: true,
        isLoading: false,
        textError: 'Что-то пошло не так...'
      })
    });
    octokit.repos.listForUser({
      username: 'viktoriya-zubtsova'
    }).then(({ data }) => {
      this.setState({
        repoList: data,
        isLoading: false
      })
      this.setState({
        repoPaginList: this.state.repoList.slice(0, this.state.paginLimit),
        paginCount: Math.ceil(this.state.repoList.length / this.state.paginLimit)
      });
    }).catch(error => {
      this.setState({
        error: true,
        isLoading: false,
        textError: 'Что-то пошло не так...'
      })
    });
  }

  changePagin(event, value) {
    this.setState({
      currentPage: value,
      repoPaginList: this.state.repoList.slice((value - 1) * this.state.paginLimit, ((value - 1) * this.state.paginLimit + this.state.paginLimit))
    });
}

  render() {
    const { isLoading, paginPaginList, error, paginCount} = this.state;

    if (this.state.error) {
			return (<div>
				<h1 className={styles.title}>{this.state.textError}</h1>
			</div>);
		} else {
    return (<div>
      <div className={styles.wrap}>
        {isLoading ? <LinearProgress /> : <div>
          <header  id={'about'}>
            <div className={styles.logo}></div>
            <nav className={styles.menu}>
              <a className={styles.menuItem} href={"#works"}>Works</a>
              <a className={styles.menuItem} href={"#skills"}>Skills</a>
              <a className={styles.menuItem} href={"#repos"}>Git repositories</a>
            </nav>
          </header>
          <div className={styles.user}>
            <img className={styles.userAvatar} src={this.state.userAvatar}/>
            <h1 className={styles.userTitle}>Viktoriya<br/><span className={styles.userTitle2}>Zubtsova</span>.</h1>
            <p className={styles.userInfo}>Привет, я <span className={styles.userBio}>{this.state.userBio}</span>
              из Краснодара, Россия<br/>Я могу помочь вам создать ваш следующий проект.</p>
            <p className={styles.userText}>Делаю верстку по макету, внесение правок в разделы/стили, доработку сайта<br/>
              Есть проект, который вы хотели бы обсудить?<br/>
              Давайте пообщаемся <MailOutlineIcon className={styles.userIcon} /><a className={styles.userLink} href={'mailto:wow5222@yandex.ru'}> wow5222@yandex.ru </a><WhatsAppIcon className={styles.userIcon} />
              <a className={styles.userLink} href={'http://wa.me/79130822502'}>WhatsApp</a><TelegramIcon className={styles.userIcon} />
              <a className={styles.userLink} href={'http://t.me/zy_vi_an'}>Telegram</a><br/>
              или позвоните мне <a className={styles.userLink} href={'tel:+79130822502'}>+7 (913) 082-25-02</a></p>
          </div>
          <div className={styles.arrow}></div>
        </div>}
        <Works />
        <Skills
          userLogin={this.state.userLogin}
          userUrl={this.state.userUrl} />
        {isLoading ? <LinearProgress /> : <div className={styles.repos} id={'repos'}>
          <h1 className={styles.title}>Git Repositories</h1>
          <p>Здесь несколько репозиториев на GitHub с моими проектами:</p>
        </div>}
        {!isLoading && <div className={styles.list}>
          <ol>
            {this.state.repoPaginList.map(repo => (<li className={styles.listItem} key={repo.id}>
              <a className={styles.listLink} href={repo.html_url}>{repo.name}</a>
              <p className={styles.listText}>{repo.description}</p>
              <div className={styles[`repoLanguage-${repo.language}`.toLowerCase()] + ' ' + styles.repoLanguageIcon}></div>
              <p>{repo.language}</p>
              <span className={styles.listText}>Updated on {new Date(repo.updated_at).toLocaleString('eng', { day:'numeric', month:'long', year:'numeric'})}</span>
            </li>))}
          </ol>
          <div className={styles.pagination}>
            <Pagination
              count={this.state.paginCount}
              onChange={this.changePagin.bind(this)} />
          </div>
        </div>}
        <div className={styles.cooperation}>
          <h1 className={styles.title}>Сooperation</h1>
          <p>Итак, вы ищете профессионального, коммуникабельного и пунктуального frontend-разработчика с навыками
            веб-программирования для вашего следующего проекта?</p>
          <p>Я всегда открыта к интересным задачам и буду рада сотрудничеству.<br/>
            Стремлюсь получить качественный результат и внимательно отношусь к мелочам,
            работа будет выполнена точно в соответствии с Вашим ТЗ и пожеланиями.
            Постоянно пополняю багаж навыков, изучение новых инструментов для меня не проблема.</p>
          <a className={styles.cooperationLink} href={'mailto:wow5222@yandex.ru'}>wow5222@yandex.ru</a>
        </div>
      </div>
      <Footer
        userName={this.state.userName}/>
    </div>);
  }
  }
}

export default App;
