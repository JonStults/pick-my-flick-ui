import React from 'react';
import { connect } from 'react-redux';
import { Form, Dropdown, Button, Modal, Icon, DropdownProps, Loader, Dimmer } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import {
    getMovies, enterMovie, createUserFlick, updateMovieWatched,
    getRandomMovie, resetMessage, resetSelected, searchMovies, resetSearch
} from '../../store/movies/actionCreators';
import { RootState } from '../../store/rootState';
import { MovieMetaData, RandomMovieModel, SearchResults } from '../../store/movies/types';
import { Messenger } from './Messenger';
import './Movies.scss';
import { GENRES, POSTER_PATH_URL } from '../../store/Constants';
import { formatYYYY } from '../../utils';

interface MoviesProps {
    genres: string[];
    selectedMovies: RandomMovieModel[];
    surfaceMessage: string;
    metaData: MovieMetaData | null;
    userId: number;
    movie_list: SearchResults[];
    total_pages: number;
    loading: boolean;
    getMovies: () => void;
    resetMessage: () => void;
    resetSelected: () => void;
    createUserFlick: (userId: number, movieId: number) => void;
    getRandomMovie: (num: number) => void;
    enterMovie: (data: SearchResults) => void;
    searchMovies: (title: string, page: number) => void;
    updateMovieWatched: (movieId: number, watched: boolean) => void;
    resetSearch: () => void;
}

interface MoviesState {
    title: string,
    genre: string,
    randomCount: number;
    openModal: number;
    closedModals: number[];
    enterModalOpen: boolean;
    getMovieModalOpen: boolean;
    enterModalStep: number;
    getModalStep: number;
    timeout: any;
    pageNumber: number;
    refSet: boolean;
    selectedMovie: SearchResults;
}

class Movies extends React.Component<MoviesProps, MoviesState> {
    constructor(props: any) {
        super(props);
        this.state = {
            title: '',
            genre: '',
            randomCount: 1,
            openModal: 0,
            closedModals: [],
            enterModalOpen: false,
            getMovieModalOpen: false,
            enterModalStep: 1,
            getModalStep: 1,
            timeout: null,
            pageNumber: 1,
            refSet: false,
            selectedMovie: {} as SearchResults
        }
    }

    componentDidMount() {
        this.props.getMovies();
    }

    componentDidUpdate(prevProps: Readonly<MoviesProps>) {
        const { selectedMovies } = this.props;
        const { refSet } = this.state;
        let dropdown = document.getElementsByClassName('search-dropdown')[0];
        if (dropdown && !refSet) {
            let menu = dropdown.children[3];
            menu.addEventListener('scroll', this.handleScroll);
            this.setState({ refSet: true });
        }
        // if (prevProps.selectedMovies !== selectedMovies) {
        //     selectedMovies.forEach((s: RandomMovieModel, index: number) => {
        //         return new Messenger(`messenger-${index}`, [s.movie.title])
        //     })
        // }
    }

    componentWillUnmount() {
        let dropdown = document.getElementsByClassName('search-dropdown')[0];
        let menu = dropdown.children[3];
        menu.removeEventListener('scroll', this.handleScroll);
    }

    handleKeyDown(e: React.KeyboardEvent) {
        const { timeout, title, pageNumber } = this.state;
        if (e.key === 'Enter' && title.trim() !== '') {
            this.props.searchMovies(title, pageNumber);
            clearTimeout(timeout);
        }
    }

    handleTimeout(value: string) {
        const { timeout, pageNumber } = this.state;
        this.setState({ title: value, pageNumber: 1 })
        if (timeout) {
            clearTimeout(timeout)
        }
        if (value.trim() !== '') {
            this.setState({
                timeout: setTimeout(() => {
                    this.props.searchMovies(value, pageNumber);
                }, 1500)
            })
        };
    }

    handleScroll = (e: any) => {
        const { total_pages } = this.props;
        const { pageNumber, title } = this.state;
        let target = e.currentTarget;
        if (Math.ceil(target.scrollTop) >= (target.scrollHeight - target.clientHeight) && total_pages !== pageNumber) {
            this.props.searchMovies(title, this.state.pageNumber + 1);
            this.setState({ pageNumber: this.state.pageNumber + 1 })
        }
    }

    handleClick = (e: any, { value }: DropdownProps) => {
        const { movie_list } = this.props;
        let movie = movie_list.filter((m: SearchResults) => { return m.id === value })[0];
        this.setState({ selectedMovie: movie });
    }

    render() {
        const { selectedMovies, loading, surfaceMessage, userId, metaData, movie_list } = this.props;
        const { title, genre, randomCount, openModal, closedModals, enterModalStep, getModalStep, enterModalOpen, getMovieModalOpen, selectedMovie } = this.state;
        return (
            <div className="flex-column home-container">
                <Modal className="enter-movie-modal" open={enterModalOpen}>
                    <div className="modal-content">
                        <Icon className="close-icon" name="close" onClick={() => { this.setState({ enterModalOpen: false, enterModalStep: 1, selectedMovie: {} as SearchResults }); this.props.resetSearch() }} />
                        <Form className="submit-movie-form">
                            {
                                enterModalStep === 1 &&
                                <div className="form-content">
                                    <Form.Field>
                                        {/* <Input className="add-movie-input" placeholder="Enter Movie" value={title} onChange={(e: any) => this.setState({ title: e.target.value })} /> */}
                                        <Dropdown
                                            placeholder="Search Movie"
                                            fluid
                                            onChange={this.handleClick}
                                            search className="search-dropdown"
                                            onSearchChange={(e: any) => this.handleTimeout(e.target.value)}
                                            selection
                                            options={movie_list}
                                        />
                                    </Form.Field>
                                    <span className="flex-grow"></span>
                                    <div className="modal-button-container">
                                        <Button className="add-movie" basic color="green" type="submit" disabled={!selectedMovie.id} onClick={() => { this.props.enterMovie(selectedMovie); this.setState({ enterModalStep: 2 }); this.props.resetSearch() }}>Add Movie</Button>
                                    </div>
                                </div>
                            }
                            {
                                enterModalStep === 2 &&
                                <div className="form-content">
                                    {
                                        loading ? <Dimmer active inverted><Loader active>Loading</Loader></Dimmer> :
                                            <div className="flex-column">
                                                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                                </svg>
                                                <span className="flex-grow"></span>
                                                <div className="flex-row modal-button-container">
                                                    <Button className="modal-two-button" basic type="button" onClick={() => this.setState({ enterModalOpen: false })}>Close</Button>
                                                    <Button className="modal-two-button" basic color="blue" type="button" onClick={() => this.setState({ enterModalStep: 1, selectedMovie: {} as SearchResults })}>Add Another Movie?</Button>
                                                </div>
                                            </div>
                                    }
                                </div>
                            }
                            {
                                enterModalStep === 3 &&
                                <Button disabled={title.trim() === '' || genre === ''} type="submit" basic onClick={() => {
                                    // this.props.enterMovie({ title: title, genre: genre });
                                    this.setState({ title: '', genre: '' })
                                }}>Submit Movie</Button>
                            }
                        </Form>
                    </div>
                </Modal>
                <Modal className="enter-movie-modal" closeOnDimmerClick={true} open={getMovieModalOpen}>
                    <div className="modal-content">
                        {
                            loading ? <Dimmer active inverted><Loader active>Loading</Loader></Dimmer> :
                                <>
                                    <Icon className="close-icon" name="close" onClick={() => this.setState({ getMovieModalOpen: false, getModalStep: 1 })} />
                                    {
                                        getModalStep === 1 &&
                                        <div className="form-content-two">
                                            How many?
                                            <Button onClick={() => this.setState({ randomCount: 1, getModalStep: 2 })}>1</Button>
                                            <Button onClick={() => this.setState({ randomCount: 3, getModalStep: 2 })}>3</Button>
                                            <Button onClick={() => this.setState({ randomCount: 5, getModalStep: 2 })}>5</Button>
                                        </div>
                                    }
                                    {
                                        getModalStep === 2 &&
                                        <Button onClick={() => { this.setState({ getModalStep: 3 }); this.props.getRandomMovie(randomCount) }}>Get Movie(s)</Button>
                                    }
                                    {
                                        getModalStep === 3 &&
                                        selectedMovies.map((s: RandomMovieModel, index: number) => {
                                            return (
                                                <div className="movie-info">
                                                    {/* <div key={s.title} className="messenger" id={`messenger-${index}`}></div> */}
                                                    <img className="movie-poster" src={POSTER_PATH_URL + s.movie.poster_path} alt="movie_poster" />
                                                    <div className="text flex-grow">
                                                        <div className="title-container">
                                                            <div className="title">{s.movie.title}</div>
                                                            <div className="sub-title">{formatYYYY(s.movie.release_date)}</div>
                                                        </div>
                                                        <div className="overview">
                                                            {s.movie.overview}
                                                        </div>
                                                        <div className="icons">
                                                            <Button onClick={() => this.props.getRandomMovie(1)} className="random"><Icon size="large" name="random" /></Button>
                                                            {
                                                                s.watched ? <Button onClick={() => this.props.updateMovieWatched(s.movie.id, false)} className="button-stripped"><Icon size="large" color="green" name="eye" /></Button> :
                                                                    <Button onClick={() => this.props.updateMovieWatched(s.movie.id, true)} className="button-stripped"><Icon size="large" color="red" name="eye slash" /></Button>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </>
                        }
                    </div>
                </Modal>
                <Modal closeOnDimmerClick={true} onClose={this.props.resetMessage} open={surfaceMessage !== null}>
                    {surfaceMessage}
                    <Button onClick={this.props.resetMessage}>No</Button>
                    <Button onClick={() => this.props.createUserFlick(userId, metaData ? metaData.movieId : -1)}>Yes</Button>
                </Modal>
                <div className="flex-row random-movie">
                    <Button onClick={() => { this.setState({ enterModalOpen: true }) }} type="button" basic>Add Movie</Button>
                    <Button onClick={() => { this.setState({ getMovieModalOpen: true }) }} type="button" basic>Get Random {randomCount === 1 ? 'Movie' : 'Movies'}</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        genres: state.MoviesState.genres,
        selectedMovies: state.MoviesState.selectedMovies,
        surfaceMessage: state.MoviesState.surfaceMessage,
        metaData: state.MoviesState.metaData,
        userId: state.AuthState.user.id,
        movie_list: state.MoviesState.searchResults,
        total_pages: state.MoviesState.totalPages,
        loading: state.MoviesState.loading
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        getMovies, enterMovie, getRandomMovie, resetMessage, resetSearch,
        createUserFlick, resetSelected, searchMovies, updateMovieWatched
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);