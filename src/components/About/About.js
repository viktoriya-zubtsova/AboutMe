import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import TelegramIcon from '@material-ui/icons/Telegram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Pagination from '@material-ui/lab/Pagination';
import { Octokit } from '@octokit/rest';
import styles from './About.module.css';
import Bali from './bali.jpg';
import Bag from './bag.jpg';
import Axion from './axion.jpg';
import TodoApp from './todo.JPG';

const octokit = new Octokit();
class About extends React.Component {
  state = {
    isLoading: true,
    projectsList: [
    {
      url: 'https://viktoriya-zubtsova.github.io/Axion/',
      text: 'Axion | Адаптивная верстка сайта-лэндинга',
      img: Axion,
      id: 1
    },
    {
      url: 'https://viktoriya-zubtsova.github.io/Bali/',
      text: 'Bali | Адаптивная верстка одно-страничного сайта',
      img: Bali,
      id: 2
     },
    {
      url: 'https://viktoriya-zubtsova.github.io/Bug-Game/',
      text: 'Bag-Game | Браузерная игра, разработанная на JavaScript',
      img: Bag,
      id: 3
    },
    {
      url: 'https://todo-app-viktoriya-zubtsova.vercel.app/',
      text: 'TodoApp | React-приложение, с применением элементов Material-UI',
      img: TodoApp,
      id: 4
     }],
    error: false,
    paginList: [],
    paginLimit: 3
  }

  componentDidMount() {
    octokit.users.getByUsername({
      username: 'viktoriya-zubtsova'
    }).then(( json ) => {
        this.setState({
          isLoading: false,
          userName: json.data.login,
          userAvatar: json.data.avatar_url,
          userUrl: json.data.html_url,
          userBio: json.data.bio,
          paginList: this.state.projectsList.slice(0, this.state.paginLimit),
          paginCount: Math.ceil(this.state.projectsList.length / this.state.paginLimit)
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
          paginList: this.state.projectsList.slice((value - 1) * this.state.paginLimit, ((value - 1) * this.state.paginLimit + this.state.paginLimit))
        });
}

  render() {
    const { isLoading, paginList, error, paginCount} = this.state;

    if (this.state.error) {
			return (<div>
				<h2 className={styles.title}>{this.state.textError}</h2>
			</div>);
		} else {
    return (
      <div>
        {!isLoading && <div>
          <div className={styles.userBlock}>
            <div className={styles.user}>
              <img className={styles.userAvatar} src={this.state.userAvatar}/>
              <div className={styles.userInfo}>
                <h2 className={styles.userTitle}>Виктория Зубцовa</h2>
                <p className={styles.userText}>{this.state.userBio}</p>
                <p className={styles.userText}>
                  <MailOutlineIcon className={styles.userIcon} /> wow5222@yandex.ru</p>
                <p className={styles.userText}>
                  <WhatsAppIcon className={styles.userIcon} />
                  <a className={styles.userLink} href={'http://wa.me/79130822502'}> +79130822502</a></p>
                <p className={styles.userText}>
                  <GitHubIcon className={styles.userIcon} />
                  <a className={styles.userLink} href={this.state.userUrl}> {this.state.userName}</a></p>
              </div>
            </div>
            <ul className={styles.userDescription}>
              <li>Работа с системой контроля версий GIT, GitHub</li>
              <li>HTML5, CSS3, JavaScript</li>
              <li>React, Material-UI</li>
              <li>Адаптивная верстка</li>
              <li>Блочная фиксированная / резиновая верстка</li>
              <li>Реализация pixel perfect, 100% соответсвие макету</li>
              <li>Keyframe анимации</li>
              <li>Подключение нестандартных шрифтов (@font-face, cufon, google web fonts)</li>
            </ul>
          </div>
        </div>}
        <h2 className={styles.title}>{ isLoading ? <LinearProgress /> : 'Мои проекты:'}</h2>
        {!isLoading && <div>
          <div className={styles.projects}>
            {this.state.paginList.map(repo => (<div className={styles.projectItem} key={repo.id}>
              <img className={styles.projectImg} src={repo.img}></img>
              <a className={styles.projectLink} href={repo.url}><br/>{repo.text}</a>
            </div>))}
          </div>
          <div className={styles.pagination}>
            <Pagination
              count={this.state.paginCount}
              variant="outlined"
              onChange={this.changePagin.bind(this)} />
          </div>
        </div>}
      </div>
    );
  }
  }
}

export default About;
