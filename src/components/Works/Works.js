import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import LinearProgress from '@material-ui/core/LinearProgress';
import Bali from './bali.jpg';
import Bag from './bag.jpg';
import Axion from './axion.jpg';
import TodoApp from './todo.jpg';
import styles from './Works.module.css';

class Works extends React.Component {
  state = {
    projectsList: [
    {
      url: 'https://viktoriya-zubtsova.github.io/Axion/',
      title: 'Axion',
      text: 'Адаптивная верстка сайта-лэндинга',
      img: Axion,
      id: 1
    },
    {
      url: 'https://viktoriya-zubtsova.github.io/Bali/',
      title: 'Bali',
      text: 'Адаптивная верстка одно-страничного сайта',
      img: Bali,
      id: 2
     },
    {
      url: 'https://viktoriya-zubtsova.github.io/Bug-Game/',
      title: 'Bag-Game',
      text: 'Браузерная игра, разработанная на JavaScript',
      img: Bag,
      id: 3
    },
    {
      url: 'https://todo-app-viktoriya-zubtsova.vercel.app/',
      title: 'TodoApp',
      text: 'React-приложение, с применением элементов Material-UI',
      img: TodoApp,
      id: 4
     }],
    isLoading: true,
    paginList: [],
    paginLimit: 2
    }

  componentDidMount() {
    this.setState({
      isLoading: false,
      paginList: this.state.projectsList.slice(0, this.state.paginLimit),
      paginCount: Math.ceil(this.state.projectsList.length / this.state.paginLimit)
    });
  }

  changePagin(event, value) {
        this.setState({
          currentPage: value,
          paginList: this.state.projectsList.slice((value - 1) * this.state.paginLimit, ((value - 1) * this.state.paginLimit + this.state.paginLimit))
        });
  }

  render() {
    const { paginList, paginCount} = this.state;
    return (
      <div>
        <h1 className={styles.title} id={'works'}>{this.state.isLoading ? <LinearProgress /> : 'Works'}</h1>
        {!this.state.isLoading && <div>
          <div className={styles.projects}>
            {this.state.paginList.map(repo => (<a className={styles.projectItem} href={repo.url} key={repo.id}>
              <img src={repo.img}></img>
              <div>
                <p className={styles.projectTitle}>{repo.title}</p>
                <p className={styles.projectText}>{repo.text}</p>
              </div>
            </a>))}
          </div>
          <div className={styles.pagination}>
            <Pagination
              count={this.state.paginCount}
              onChange={this.changePagin.bind(this)} />
          </div>
        </div>}
      </div>
    );
  }
}

export default Works;
