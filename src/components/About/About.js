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

const octokit = new Octokit();
class About extends React.Component {
  state = {
    isLoading: true,
    repoList: [
    {
      url: 'https://viktoriya-zubtsova.github.io/Axion/',
      text: 'Адаптивная верстка сайта-лэндинга',
      id: 1
    }, 
    { 
      url: 'https://viktoriya-zubtsova.github.io/Bali/',
      text: 'Адаптивная верстка одно-страничного сайта',
      id: 2
     },
    {
      url: 'https://viktoriya-zubtsova.github.io/Bug-Game/',
      text: 'Браузерная игра, разработанная на JavaScript',
      id: 3
    }],
    error: false,
    repoPaginList: [],
    paginLimit: 3
  }
  componentDidMount() {
    octokit.users.getByUsername({
      username: 'viktoriya-zubtsova'
    }).then(( json ) => {
        this.setState({
          userName: json.data.login,
          userAvatar: json.data.avatar_url,
          userUrl: json.data.html_url,
          userBio: json.data.bio
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
    const { isLoading, repoPaginList, error, paginCount} = this.state;

    if (this.state.error) {
			return (<div>
				<h2 className={styles.title}>{this.state.textError}</h2>
			</div>);
		} else {
    return (
      <div>
        {!isLoading && <div>
          <div className={styles.user}>
            <img className={styles.userAvatar} src={this.state.userAvatar}/>
            <div className={styles.userInfo}>
              <h2 className={styles.userTitle}>Виктория Зубцовa</h2>
              <p className={styles.userText}>{this.state.userBio}</p>
              <p className={styles.userText}>
                <MailOutlineIcon className={styles.userIcon} /> wow55222@yandex.ru</p>
              <p className={styles.userText}>
                <TelegramIcon className={styles.userIcon} /><WhatsAppIcon className={styles.userIcon} /> +79130822502</p>
              <p className={styles.userText}>
                <GitHubIcon className={styles.userIcon} />
                <a className={styles.link} href={this.state.userUrl}> {this.state.userName}</a></p>
              <p className={styles.userText}>
                <InstagramIcon className={styles.userIcon} />
                <a className={styles.link} href={'https://www.instagram.com/zy_vi_an'}> zy_vi_an</a></p>
            </div>
          </div>
          <div className={styles.projects}>
           <h2 className={styles.title}>Знания, умения, навыки:</h2>
          </div>
        </div>}
        <h2 className={styles.title}>{ isLoading ? <LinearProgress /> : 'Мои проекты:'}</h2>
        {!isLoading && <div>
          <ol className={styles.list}>
            {this.state.repoPaginList.map(repo => (<li className={styles.listItem} key={repo.id}>
              <a className={styles.projectLink} href={repo.url}>{repo.url}</a>
              <span className={styles.text}>{repo.text}</span>
            </li>))}
          </ol>
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
